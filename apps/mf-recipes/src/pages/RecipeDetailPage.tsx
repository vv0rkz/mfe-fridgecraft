import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getItemInfo } from '../data/items'
import { RECIPES } from '../data/recipes'
import { useInventoryStore } from '../shared/useInventoryStore'
import type { Recipe } from '../types'
import * as styles from './RecipeDetailPage.module.css'

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

function IngredientChecklist({ recipe, getItemCount }: { recipe: Recipe; getItemCount: (item: string) => number }) {
  return (
    <ul className={styles.ingredientList}>
      {recipe.ingredients.map(({ item, count }) => {
        const info = getItemInfo(item)
        const have = getItemCount(item) ?? 0
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
  const recipe = RECIPES.find((r) => r.id === id)
  const { getItemCount, hasItems, craftRecipe, isRecipeKnown } = useInventoryStore()

  if (!recipe) {
    return (
      <div className={styles.page}>
        <p>Recipe not found</p>
        <Link to="/">← Back to Recipe Book</Link>
      </div>
    )
  }

  const isKnown = isRecipeKnown(recipe.id)

  if (!isKnown) {
    return (
      <div className={styles.page}>
        <p>Recipe not discovered yet</p>
        <Link to="/">← Back to Recipe Book</Link>
      </div>
    )
  }

  const canCraft = hasItems(recipe.ingredients)

  const firstMissing = recipe.ingredients.find(({ item, count }) => {
    return getItemCount(item) < count
  })
  //
  // Временный mock-расчет оставить только до тех пор, пока bridge еще не реализован.
  // const canCraft = recipe.ingredients.every(({ item, count }) => (MOCK_INVENTORY[item] ?? 0) >= count)
  // const firstMissing = recipe.ingredients.find(({ item, count }) => (MOCK_INVENTORY[item] ?? 0) < count)
  const firstMissingInfo = firstMissing ? getItemInfo(firstMissing.item) : null
  const statusBadge = canCraft
    ? '✅ Ready to craft'
    : firstMissing
      ? `❌ Need: ${firstMissingInfo?.emoji ?? ''} ${firstMissingInfo?.name ?? firstMissing.item} ×${firstMissing.count - getItemCount(firstMissing.item)}`
      : '❌ Missing ingredients'

  function handleCraftRecipe(r: Recipe) {
    craftRecipe({
      recipeId: r.id,
      consumes: r.ingredients,
      produces: [{ item: r.id, count: 1 }],
    })
  }

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Back to Recipe Book
      </Link>

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
          <h1 className={styles.title}>
            {recipe.name} {recipe.emoji}
          </h1>
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
            <IngredientChecklist recipe={recipe} getItemCount={getItemCount} />
          </section>

          <div className={styles.actions}>
            {canCraft && (
              <button type="button" className={styles.btnPrimary} onClick={() => handleCraftRecipe(recipe)}>
                Craft {recipe.name}
              </button>
            )}
            <Link to="/craft/table" className={styles.btn}>
              Open Crafting Table →
            </Link>
            <Link to="/trade" className={styles.btn}>
              Get Ingredients →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
