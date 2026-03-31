import { Recipe } from '../types';
type InventoryBridge = {
    getItemCount: (item: string) => number;
    hasItems: (requirements: Recipe['ingredients']) => boolean;
    craftRecipe: (input: {
        recipeId: string;
        consumes: Recipe['ingredients'];
        produces: {
            item: string;
            count: number;
        }[];
    }) => {
        ok: boolean;
        reason?: 'unknown_recipe' | 'missing_ingredients';
        missing?: {
            item: string;
            count: number;
        }[];
    };
};
export declare function useInventoryBridge(): InventoryBridge | void;
export {};
