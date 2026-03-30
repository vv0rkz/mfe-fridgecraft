import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Inventory = Record<string, number>

export type ItemStack = {
  item: string
  count: number
}

export type CraftRecipeInput = {
  recipeId: string
  consumes: ItemStack[]
  produces: ItemStack[]
}

export type CraftRecipeResult =
  | { ok: true }
  | {
      ok: false
      reason: 'unknown_recipe' | 'missing_ingredients'
      missing?: ItemStack[]
    }

type InventoryStore = {
  // ─── State ───
  inventory: Inventory
  knownRecipes: string[]
  unlockedPlots: number

  // ─── Inventory actions ───
  addItem: (item: string, count: number) => void
  removeItem: (item: string, count: number) => boolean // false если не хватает
  getItemCount: (item: string) => number
  hasItems: (requirements: ItemStack[]) => boolean

  // ─── Recipe actions ───
  craftRecipe: (input: CraftRecipeInput) => CraftRecipeResult
  discoverRecipe: (recipeId: string) => void
  isRecipeKnown: (recipeId: string) => boolean

  // ─── Farm actions ───
  unlockPlot: () => void

  // ─── Dev helpers ───
  resetAll: () => void
}

const INITIAL_STATE = {
  inventory: { wheat: 5, potato: 2 } as Inventory,
  knownRecipes: ['bread'] as string[],
  unlockedPlots: 2,
}

function dispatchInventoryUpdate(inventory: Inventory) {
  // TODO: Оповестить все remotes об изменении инвентаря через CustomEvent.
  // window.dispatchEvent(new CustomEvent('fridgecraft:inventory-updated', { detail: { inventory } }))
}

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      addItem: (item, count) => {
        // TODO:
        // 1. Взять текущий inventory из store.
        // 2. Посчитать текущее количество item через inventory[item] ?? 0.
        // 3. Собрать nextInventory с увеличенным количеством.
        // 4. Сохранить nextInventory через set({ inventory: nextInventory }).
        // 5. Вызвать dispatchInventoryUpdate(nextInventory).
      },

      removeItem: (item, count) => {
        // TODO:
        // 1. Взять текущее количество item из inventory.
        // 2. Если currentCount < count, вернуть false.
        // 3. Иначе вычислить nextCount = currentCount - count.
        // 4. Собрать nextInventory:
        //    - если nextCount === 0, удалить ключ item
        //    - иначе записать item: nextCount
        // 5. Сохранить nextInventory в store.
        // 6. Вызвать dispatchInventoryUpdate(nextInventory).
        // 7. Вернуть true.
        return true
      },

      getItemCount: (item) => {
        return get().inventory[item] ?? 0
      },

      hasItems: (requirements: ItemStack[]) => {
        for (const { item, count } of requirements) {
          if (count > get().getItemCount(item)) {
            return false
          }
        }
        return true
      },

      craftRecipe: ({ recipeId, consumes, produces }) => {
        if (!get().isRecipeKnown(recipeId)) {
          return { ok: false, reason: 'unknown_recipe' }
        }
        const nextInventory = { ...get().inventory }
        for (const { item, count } of consumes) {
          nextInventory[item] -= count
        }
        for (const { item, count } of produces) {
          nextInventory[item] += count
        }
        set({ inventory: nextInventory })
        dispatchInventoryUpdate(nextInventory)
        return { ok: true }
      },

      discoverRecipe: (recipeId) => {
        // TODO:
        // 1. Проверить, что recipeId еще не лежит в knownRecipes.
        // 2. Если рецепта нет, добавить его в knownRecipes.
        // 3. Если уже есть, ничего не делать.
        void recipeId
      },

      isRecipeKnown: (recipeId) => {
        return get().knownRecipes.includes(recipeId)
      },

      unlockPlot: () => {
        // TODO:
        // 1. Взять текущее значение unlockedPlots.
        // 2. Увеличить его на 1 через set().
      },

      resetAll: () => {
        // TODO:
        // 1. Сбросить store к INITIAL_STATE.
        // 2. Вызвать dispatchInventoryUpdate(INITIAL_STATE.inventory).
      },
    }),
    {
      name: 'fridgecraft-store',
    },
  ),
)
