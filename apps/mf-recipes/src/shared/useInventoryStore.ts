import type { RecipeIngredient } from '../types'

// Узкий публичный контракт shell-store для mf-recipes.
// Намеренно не включает внутренние методы shell (addItem, removeItem, etc.)
// и не раскрывает структуру state (inventory, knownRecipes).
export type InventoryBridge = {
  getItemCount: (item: string) => number
  hasItems: (requirements: RecipeIngredient[]) => boolean
  isRecipeKnown: (recipeId: string) => boolean
  craftRecipe: (input: { recipeId: string; consumes: RecipeIngredient[]; produces: RecipeIngredient[] }) => {
    ok: boolean
    reason?: 'unknown_recipe' | 'missing_ingredients'
    missing?: RecipeIngredient[]
  }
}

const MOCK_INVENTORY: Record<string, number> = {
  wheat: 5,
  potato: 2,
}

// Fallback используется в standalone-режиме (mf-recipes без shell).
// В standalone все рецепты считаются известными, крафт недоступен.
const FALLBACK: InventoryBridge = {
  getItemCount: (item) => MOCK_INVENTORY[item] ?? 0,
  hasItems: (reqs) => reqs.every(({ item, count }) => (MOCK_INVENTORY[item] ?? 0) >= count),
  isRecipeKnown: () => false,
  craftRecipe: () => ({ ok: false, reason: 'unknown_recipe' }),
}

export function useInventoryStore(): InventoryBridge {
  const shellStore = (window as any).__fridgecraft?.useInventoryStore
  if (!shellStore) {
    return FALLBACK
  }

  const { getItemCount, hasItems, isRecipeKnown, craftRecipe } = shellStore()
  return { getItemCount, hasItems, isRecipeKnown, craftRecipe }
}
