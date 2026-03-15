export type RecipeCategory = 'crops' | 'meat' | 'sweets' | 'soups' | 'special'

export type RecipeIngredient = {
  item: string
  count: number
}

export type Recipe = {
  id: string
  name: string
  emoji: string
  imageUrl: string
  category: RecipeCategory
  hungerRestored: number   // в половинках сердец (1–14)
  saturation: number
  description: string
  ingredients: RecipeIngredient[]

  // Паттерн крафта 3×3 — 9 ячеек, null = пусто
  // Индексы: [0][1][2] / [3][4][5] / [6][7][8]
  // TODO (v2.3): реализовать recipeEngine для матчинга сетки
  craftingPattern: (string | null)[]
  shapeless: boolean  // true = порядок не важен
}
