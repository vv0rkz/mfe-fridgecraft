/**
 * Справочник предметов: id → отображаемое имя и иконка (emoji).
 * Используется в RecipeCard, RecipeDetailPage, CraftingPattern.
 */

export type ItemInfo = {
  name: string
  emoji: string
}

export const ITEMS: Record<string, ItemInfo> = {
  wheat: { name: 'Wheat', emoji: '🌾' },
  sugar: { name: 'Sugar', emoji: '🍬' },
  egg: { name: 'Egg', emoji: '🥚' },
  milk_bucket: { name: 'Milk Bucket', emoji: '🥛' },
  brown_mushroom: { name: 'Brown Mushroom', emoji: '🍄' },
  red_mushroom: { name: 'Red Mushroom', emoji: '🔴' },
  bowl: { name: 'Bowl', emoji: '🥣' },
  pumpkin: { name: 'Pumpkin', emoji: '🎃' },
  potato: { name: 'Potato', emoji: '🥔' },
  raw_chicken: { name: 'Raw Chicken', emoji: '🍗' },
  raw_beef: { name: 'Raw Beef', emoji: '🥩' },
  apple: { name: 'Apple', emoji: '🍎' },
  gold_ingot: { name: 'Gold Ingot', emoji: '🪙' },
  carrot: { name: 'Carrot', emoji: '🥕' },
  gold_nugget: { name: 'Gold Nugget', emoji: '✨' },
  cocoa_beans: { name: 'Cocoa Beans', emoji: '🫘' },
  beetroot: { name: 'Beetroot', emoji: '🫚' },
  cooked_rabbit: { name: 'Cooked Rabbit', emoji: '🍖' },
  baked_potato: { name: 'Baked Potato', emoji: '🥔' },
}

export function getItemInfo(itemId: string): ItemInfo {
  return ITEMS[itemId] ?? {
    name: itemId.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    emoji: '📦',
  }
}
