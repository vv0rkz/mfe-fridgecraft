import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { RECIPES } from '../data/recipes'
import { getItemInfo } from '../data/items'
import type { Recipe } from '../types'
import * as styles from './RecipeDetailPage.module.css'

// TODO: подключить useInventoryStore — have/need в чеклисте, Craft button → removeItem + addItem
const MOCK_INVENTORY: Record<string, number> = {
  wheat: 5,
  potato: 2,
}

function CraftingPattern({ pattern }: { pattern: (string | null)[] }) {
  return (
    <div className={styles.patternGrid}>
      {pattern.map((item, i) => {
        const info = item ? getItemInfo(item) : null
        return (
          <div key={i} className={styles.patternCell} title={info?.name}>
            {info ? <span className={styles.patternIcon}>{info.emoji}</span> : '—'}
          </div>
        )
      })}
    </div>
  )
}

function IngredientChecklist({ recipe }: { recipe: Recipe }) {
  return (
    <ul className={styles.ingredientList}>
      {recipe.ingredients.map(({ item, count }) => {
        const info = getItemInfo(item)
        const have = MOCK_INVENTORY[item] ?? 0
        const ok = have >= count
        return (
          <li key={item} className={ok ? styles.ingredientOk : styles.ingredientMissing}>
            <span className={styles.ingredientIcon}>{ok ? '✅' : '❌'}</span>
            <span className={styles.ingredientIcon}>{info.emoji}</span>
            {info.name} ×{count} <span className={styles.ingredientHave}>(have {have})</span>
          </li>
        )
      })}
    </ul>
  )
}

export default function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [imageError, setImageError] = useState(false)
  const recipe = RECIPES.find(r => r.id === id)

  if (!recipe) {
    return (
      <div className={styles.page}>
        <p>Recipe not found</p>
        <Link to="/">← Back to Recipe Book</Link>
      </div>
    )
  }

  const canCraft = recipe.ingredients.every(
    ({ item, count }) => (MOCK_INVENTORY[item] ?? 0) >= count
  )
  const firstMissing = recipe.ingredients.find(
    ({ item, count }) => (MOCK_INVENTORY[item] ?? 0) < count
  )
  const firstMissingInfo = firstMissing ? getItemInfo(firstMissing.item) : null
  const statusBadge = canCraft
    ? '✅ Ready to craft'
    : firstMissing
      ? `❌ Need: ${firstMissingInfo?.emoji ?? ''} ${firstMissingInfo?.name ?? firstMissing.item} ×${firstMissing.count - (MOCK_INVENTORY[firstMissing.item] ?? 0)}`
      : '❌ Missing ingredients'

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>← Back to Recipe Book</Link>

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <div className={styles.spriteWrap}>
            {imageError ? (
              <span className={styles.spriteFallback}>{recipe.emoji}</span>
            ) : (
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className={styles.sprite}
                onError={() => setImageError(true)}
              />
            )}
          </div>
          <h1 className={styles.title}>{recipe.name} {recipe.emoji}</h1>
          <span className={`${styles.statusBadge} ${canCraft ? styles.statusReady : styles.statusMissing}`}>
            {statusBadge}
          </span>
          <p className={styles.description}>{recipe.description}</p>
          <div className={styles.stats}>
            <span>Hunger: {'❤️'.repeat(Math.ceil(recipe.hungerRestored / 2))}</span>
            <span>Category: {recipe.category}</span>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Crafting Pattern</h2>
            <CraftingPattern pattern={recipe.craftingPattern} />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Ingredients</h2>
            <IngredientChecklist recipe={recipe} />
          </section>

          <div className={styles.actions}>
            {canCraft && (
              <button type="button" className={styles.btnPrimary}>
                Craft {recipe.name}
              </button>
            )}
            <Link to="/craft/table" className={styles.btn}>Open Crafting Table →</Link>
            <Link to="/trade" className={styles.btn}>Get Ingredients →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
