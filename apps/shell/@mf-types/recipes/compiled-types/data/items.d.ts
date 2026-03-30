/**
 * Справочник предметов: id → отображаемое имя и иконка (emoji).
 * Используется в RecipeCard, RecipeDetailPage, CraftingPattern.
 */
export type ItemInfo = {
    name: string;
    emoji: string;
};
export declare const ITEMS: Record<string, ItemInfo>;
export declare function getItemInfo(itemId: string): ItemInfo;
