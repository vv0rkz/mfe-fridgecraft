import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Inventory = Record<string, number>

type InventoryStore = {
  // ─── State ───
  inventory: Inventory
  knownRecipes: string[]
  unlockedPlots: number

  // ─── Inventory actions ───
  addItem: (item: string, count: number) => void
  removeItem: (item: string, count: number) => boolean  // false если не хватает
  getItemCount: (item: string) => number
  hasItems: (requirements: { item: string; count: number }[]) => boolean

  // ─── Recipe actions ───
  discoverRecipe: (recipeId: string) => void
  isRecipeKnown: (recipeId: string) => boolean

  // ─── Farm actions ───
  unlockPlot: () => void

  // ─── Dev helpers ───
  resetAll: () => void
}

const INITIAL_STATE = {
  inventory: {} as Inventory,
  knownRecipes: ['bread'] as string[],
  unlockedPlots: 2,
}

function dispatchInventoryUpdate(inventory: Inventory) {
  // Оповещаем все remotes об изменении инвентаря через CustomEvent
  window.dispatchEvent(
    new CustomEvent('fridgecraft:inventory-updated', { detail: { inventory } })
  )
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addItem: (item, count) => {
        // TODO: добавить count единиц item в инвентарь
        // после set() вызвать dispatchInventoryUpdate с новым инвентарём
      },

      removeItem: (item, count) => {
        // TODO: проверить что item >= count в инвентаре
        // если нет — вернуть false (не хватает)
        // если да — вычесть count, удалить ключ если стало 0
        // вызвать dispatchInventoryUpdate, вернуть true
        return false
      },

      getItemCount: (item) => {
        // TODO: вернуть количество item из инвентаря (0 если нет)
        return 0
      },

      hasItems: (requirements) => {
        // TODO: проверить каждый requirement через getItemCount
        // вернуть true только если ВСЕ выполнены
        return false
      },

      discoverRecipe: (recipeId) => {
        // TODO: добавить recipeId в knownRecipes если его там ещё нет
      },

      isRecipeKnown: (recipeId) => {
        // TODO: проверить есть ли recipeId в knownRecipes
        return false
      },

      unlockPlot: () => {
        // TODO: увеличить unlockedPlots на 1
      },

      resetAll: () => {
        // TODO: сбросить стейт к INITIAL_STATE
        // вызвать dispatchInventoryUpdate с пустым инвентарём
      },
    }),
    {
      name: 'fridgecraft-store',
    }
  )
)
