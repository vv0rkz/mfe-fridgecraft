import type { Recipe } from '../../types'
import { getItemInfo } from '../../data/items'
import * as styles from './RecipeCard.module.css'

type Props = {
  recipe: Recipe
  isKnown: boolean
  canCraft: boolean
  missingItems?: { item: string; need: number; have: number }[]
  onClick?: () => void
}

function HungerHearts({ count }: { count: number }) {
  const full = Math.floor(count / 2)
  const half = count % 2

  return (
    <div className={styles.hearts}>
      {Array.from({ length: full }).map((_, i) => (
        <span key={i} className={styles.heart}>❤️</span>
      ))}
      {half > 0 && <span className={styles.heart}>💔</span>}
    </div>
  )
}

export default function RecipeCard({ recipe, isKnown, canCraft, missingItems = [], onClick }: Props) {
  const cardClass = [
    styles.card,
    !isKnown ? styles.unknown : '',
    isKnown && canCraft ? styles.craftable : '',
  ].filter(Boolean).join(' ')

  if (!isKnown) {
    return (
      <div className={cardClass} onClick={onClick} role={onClick ? 'button' : undefined}>
        <div className={styles.header}>
          <div className={styles.imageWrap}>
            <span className={styles.imageFallback}>❓</span>
          </div>
          <div className={styles.titleWrap}>
            <div className={styles.name}>???</div>
            <HungerHearts count={0} />
          </div>
        </div>
        <p className={styles.description}>Undiscovered recipe</p>
        <div className={styles.footer}>
          <span className={styles.categoryBadge}>unknown</span>
          <span className={`${styles.statusBadge} ${styles.unknownBadge}`}>
            🔒 Locked
          </span>
        </div>
      </div>
    )
  }

  const firstMissing = missingItems[0]
  const firstMissingInfo = firstMissing ? getItemInfo(firstMissing.item) : null
  const statusLabel = canCraft
    ? '✅ Can Craft'
    : firstMissing
      ? `❌ Need ${firstMissingInfo?.emoji ?? ''} ${firstMissingInfo?.name ?? firstMissing.item} ×${firstMissing.need - firstMissing.have}`
      : '❌ Missing items'

  return (
    <div className={cardClass} onClick={onClick} role={onClick ? 'button' : undefined}>
      <div className={styles.header}>
        <div className={styles.imageWrap}>
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className={styles.image}
            onError={(e) => {
              const span = document.createElement('span')
              span.className = styles.imageFallback
              span.textContent = recipe.emoji
              e.currentTarget.replaceWith(span)
            }}
          />
        </div>
        <div className={styles.titleWrap}>
          <div className={styles.name}>{recipe.name}</div>
          <HungerHearts count={recipe.hungerRestored} />
        </div>
      </div>

      <p className={styles.description}>{recipe.description}</p>

      <div className={styles.ingredients}>
        {recipe.ingredients.map(({ item, count }) => {
          const info = getItemInfo(item)
          return (
            <span key={item} className={styles.ingredient} title={info.name}>
              <span className={styles.ingredientIcon}>{info.emoji}</span>
              {info.name} ×{count}
            </span>
          )
        })}
      </div>

      <div className={styles.footer}>
        <span className={styles.categoryBadge}>{recipe.category}</span>
        <span className={`${styles.statusBadge} ${canCraft ? styles.canCraft : styles.missing}`}>
          {statusLabel}
        </span>
      </div>
    </div>
  )
}
