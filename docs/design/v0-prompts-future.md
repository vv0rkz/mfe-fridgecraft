# v0.dev Промпты (детальные) — FridgeCraft

Эти промпты для платной версии v0.dev — дают более точный результат.
Простые промпты → `v0-prompts.md`

---

## Экран 1 — Recipe Book (mf-recipes)

```
Dark themed Minecraft recipe book web app page.
Background #0f0f0f, card surface #1c1c1c, accent green #5dbb63.

Header: logo "⚒️ FridgeCraft" left, navigation tabs "Recipe Book | Farm | Trade" center,
inventory bar right showing ingredient emojis with counts (🌾×5 🥕×2 💎×1), 
green emerald counter "💎 1" separated.

Below header: title "Recipe Book", two counters "✅ Can Craft: 2" and "🔍 Discovered: 4 / 12".
Filter pills row: All · Crops · Meat · Sweets · Soups · Special. Active pill green #5dbb63.

Card grid 3 columns, cards are #1c1c1c with rounded corners 8px, subtle border #3a3a3a.

KNOWN + CAN CRAFT card (green glow border):
  - Square food image top (Minecraft pixel art style, e.g. bread sprite)
  - Food name "Bread" bold white
  - Heart row "❤️❤️❤" for hunger
  - Ingredients small grey text "🌾 Wheat ×3"
  - Green badge "✅ Can Craft"
  - Green "Craft →" button

KNOWN + MISSING card (normal border):
  - Food image
  - Name "Mushroom Stew"
  - Hearts
  - Ingredients with missing highlighted red: "🍄 ×1 ✅  🥣 Bowl ×1 ❌"
  - Blue badge "Need more"

UNKNOWN card (blurred/locked):
  - Blurred grey image with lock icon overlay
  - "???" instead of name
  - "Undiscovered Recipe" grey text
  - "Try crafting or buy Recipe Book" hint
  - No buttons

Show 2 known-craftable, 3 known-missing, 4 unknown cards in the grid.
Dark gaming aesthetic, clean modern UI.
```

---

## Экран 2 — Farm (mf-craft, вкладка Farm)

```
Minecraft farming dashboard. Dark theme #0f0f0f.

Header same as Recipe Book.
Two tabs below header: "🌾 Farm" (active, green #5dbb63 underline) | "🔨 Crafting Table".
Tab subtitle: "Grow ingredients for crafting".

Main area: 3×3 grid of plot cards, card surface #1c1c1c rounded.

LOCKED plot (grey, 🔒):
  - Lock icon center large
  - "Locked" title
  - Price "💎 ×5" in gold #f5c542
  - "Unlock" button outline gold

EMPTY plot (dashed border #3a3a3a):
  - "+" icon center
  - "Empty Plot" grey text
  - "🌱 Plant Crop" green button small

GROWING plot (Wheat example):
  - "🌾" emoji large center top
  - "Wheat" name bold
  - Circular progress ring (60% green filled, track dark)
  - Countdown "0:27 remaining" muted text
  - Disabled grey "Harvest" button

READY plot (pulsing green glow):
  - "🌾" emoji large
  - "Wheat" name
  - "Ready to Harvest!" green text
  - Big green "Harvest 🌾 ×3" button

Show: 2 unlocked (1 growing Wheat 60%, 1 ready Carrot), 
      1 empty unlocked, 6 locked with prices 💎×3, ×5, ×8, ×12, ×18, ×25.

Right sidebar panel "My Inventory" #1c1c1c:
  List: 🌾 Wheat ×8 / 🥕 Carrot ×3 / 💎 Emerald ×2 / 🥔 Potato ×0 (greyed)
  Total items count at bottom.
```

---

## Экран 3 — Crafting Table (mf-craft, вкладка Crafting Table)

```
Minecraft crafting table interface as web app. Dark theme #0f0f0f.

Same header. Tabs: "🌾 Farm" | "🔨 Crafting Table" (active).

Three column layout:

LEFT PANEL (25%) "Inventory" surface #1c1c1c rounded:
  Title "Your Ingredients"
  Scrollable list, each row: emoji + name + count badge
    🌾 Wheat ×8   [selected, green highlight]
    🥕 Carrot ×3
    🥚 Egg ×2
    🍬 Sugar ×1
    💎 Emerald ×2
  Click to select ingredient, selected has green left border.

CENTER PANEL (50%):
  Title "Crafting Table"
  3×3 grid of cells, each cell #2a2a2a border #3a3a3a 60px square rounded:
    Row 1: [🌾 Wheat] [🌾 Wheat] [🌾 Wheat]
    Row 2: [empty]    [empty]    [empty]
    Row 3: [empty]    [empty]    [empty]
  Arrow "→" right of grid
  Result slot (larger, 80px, green border glow): [🍞] "Bread"
  Below result: "Known recipe!" green text
  "Clear Grid" small button below grid

  Second example below (greyed, smaller): show unknown combination
    Grid with random ingredients → result slot shows "❓ Unknown Recipe"
    "🎉 Keep experimenting to discover!" hint text

RIGHT PANEL (25%) "Recipe Result" surface #1c1c1c:
  Large food image 🍞
  Name "Bread" bold large
  Description italic grey "A staple food, easy to craft"
  Hunger: ❤️❤️❤ "5 hunger points"
  Ingredients checklist:
    ✅ Wheat ×3 (have 8)
  Big green "Craft It!" button
  Small text "Will consume: Wheat ×3"
```

---

## Экран 4 — Village Market (mf-trade)

```
Minecraft village trading post web page. Dark theme #0f0f0f.

Same header.
Page title "🏘️ Village Market", subtitle "Trade resources with villagers".

TOP ROW: 4 villager cards horizontal, surface #1c1c1c rounded.

FARMER card (🟤):
  Large "🟤" or farmer avatar emoji
  Name "Farmer Grot" bold
  Profession badge "Farmer" green
  "3 trades available"
  "Trade" green button

BUTCHER card (⬜):
  "⬜" avatar
  "Butcher Hans"
  Profession badge "Butcher" grey
  "2 trades available"
  "Trade" button

CLERIC card (🟣):
  "🟣" avatar  
  "Cleric Mira"
  Profession badge "Cleric" purple
  "3 trades available"
  Special note "📖 Sells Recipe Books!"
  "Trade" button

WANDERING TRADER card (🧙) — timer state:
  "🧙" avatar with yellow glow
  "Wandering Trader"
  Yellow badge "Here now!"
  Countdown "Leaves in 1:45" gold #f5c542
  "Trade Now!" gold button

BELOW: expanded trade panel for Farmer Grot (selected, highlighted card):
  Title "Farmer Grot's Trades"
  
  Trade rows:
  [🌾 Wheat ×20] → [💎 Emerald ×1]   [Trade ✓] green button (have enough)
  [🥕 Carrot ×22] → [💎 Emerald ×1]  [Trade ✗] grey button, tooltip "Need 19 more Carrot"
  [💎 Emerald ×1] → [🌾 Wheat ×20]   [Trade ✓] green button
  
  Section "Unlock Farm Plots":
  [Plot #3 — 💎 ×3] [Unlock ✓]  
  [Plot #4 — 💎 ×5] [Unlock ✗] grey "Need 3 more Emeralds"
  [Plot #5 — 💎 ×8] [Unlock ✗]

  Success toast (top right): "✅ Trade complete! +1 Emerald" green toast notification

Bottom inventory reminder bar: "Your inventory: 🌾×8  🥕×3  💎×2  🥚×2"
```

---

## После генерации — что смотреть

1. Тёмная тема читается комфортно?
2. Зелёный акцент #5dbb63 выглядит как "Minecraft зелень"?
3. Золотой #f5c542 хорошо выделяет Emerald/валюту?
4. Карточки заблюренных рецептов выглядят загадочно?
5. Сетка 3×3 крафтинга интуитивна?
6. Locked грядки с ценой понятны?

Скриншоты → `docs/design/01-recipe-book.png` и т.д.
