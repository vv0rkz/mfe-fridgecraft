export type RecipeCategory = 'crops' | 'meat' | 'sweets' | 'soups' | 'special';
export type RecipeIngredient = {
    item: string;
    count: number;
};
export type Recipe = {
    id: string;
    name: string;
    emoji: string;
    imageUrl: string;
    category: RecipeCategory;
    hungerRestored: number;
    saturation: number;
    description: string;
    ingredients: RecipeIngredient[];
    craftingPattern: (string | null)[];
    shapeless: boolean;
};
