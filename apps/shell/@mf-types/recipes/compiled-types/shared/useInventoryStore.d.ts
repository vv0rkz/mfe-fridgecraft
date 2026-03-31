import type { RecipeIngredient } from '../types';
export type InventoryBridge = {
    getItemCount: (item: string) => number;
    hasItems: (requirements: RecipeIngredient[]) => boolean;
    isRecipeKnown: (recipeId: string) => boolean;
    craftRecipe: (input: {
        recipeId: string;
        consumes: RecipeIngredient[];
        produces: RecipeIngredient[];
    }) => {
        ok: boolean;
        reason?: 'unknown_recipe' | 'missing_ingredients';
        missing?: RecipeIngredient[];
    };
};
export declare function useInventoryStore(): InventoryBridge;
