import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard/RecipeCard'
import { RECIPES, RECIPE_CATEGORIES } from '../data/recipes'
import { useInventoryStore } from '../shared/useInventoryStore'
import type { RecipeCategory } from '../types'
import * as styles from './CatalogPage.module.css'

type Filter = 'all' | 'canCraft' | RecipeCategory

export default function CatalogPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const [unknownHint, setUnknownHint] = useState<string | null>(null)
  const navigate = useNavigate()
  const { isRecipeKnown, getItemCount } = useInventoryStore()

  const knownRecipes = RECIPES.filter((r) => isRecipeKnown(r.id))
  const craftableRecipes = knownRecipes.filter((r) =>
    r.ingredients.every(({ item, count }) => (getItemCount(item) ?? 0) >= count),
  )

  const filtered =
    activeFilter === 'all'
      ? RECIPES
      : activeFilter === 'canCraft'
        ? craftableRecipes
        : RECIPES.filter((r) => r.category === activeFilter)

  const knownCount = knownRecipes.length
  const craftableCount = craftableRecipes.length

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Recipe Book</h1>
        <p className={styles.subtitle}>Discover and craft delicious meals from the Overworld</p>
        <div className={styles.counters}>
          <span className={styles.counterCraft}>
            ✅ Can Craft: {craftableCount} / {RECIPES.length}
          </span>
          <span className={styles.counterDiscovered}>
            🔍 Discovered: {knownCount} / {RECIPES.length}
          </span>
        </div>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All
        </button>
        <button
          className={`${styles.filterBtn} ${activeFilter === 'canCraft' ? styles.active : ''}`}
          onClick={() => setActiveFilter('canCraft')}
        >
          Can Craft
        </button>
        {RECIPE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeFilter === cat ? styles.active : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {unknownHint && (
        <div className={styles.unknownHint} role="alert">
          {unknownHint}
          <button
            type="button"
            className={styles.unknownHintClose}
            onClick={() => setUnknownHint(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          {activeFilter === 'canCraft' ? (
            <>
              <p>No recipes you can craft yet.</p>
              <p className={styles.emptyStateSub}>Grow ingredients on the Farm or buy from the Village Market.</p>
            </>
          ) : (
            <p>No recipes in this category.</p>
          )}
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((recipe) => {
            const isKnown = isRecipeKnown(recipe.id)
            const ingredientsWithCount = isKnown
              ? recipe.ingredients.map(({ item, count }) => ({
                  item,
                  need: count,
                  have: getItemCount(item),
                }))
              : []
            const canCraft = isKnown && ingredientsWithCount.every(({ need, have }) => have >= need)
            const missingItems = ingredientsWithCount.filter(({ need, have }) => have < need)

            return (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isKnown={isKnown}
                canCraft={canCraft}
                missingItems={missingItems}
                onClick={
                  isKnown
                    ? () => navigate(`/recipes/${recipe.id}`)
                    : () => setUnknownHint('Try crafting it or buy from Cleric.')
                }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
