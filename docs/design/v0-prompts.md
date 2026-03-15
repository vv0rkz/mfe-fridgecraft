# v0.dev Промпты — FridgeCraft

Открой https://v0.dev и запусти каждый промпт.
Скриншоты сохраняй рядом с этим файлом: `recipe-book.png`, `farm.png`, `crafting-table.png`, `village-market.png`

---

## Экран 1 — Recipe Book (mf-recipes)

```
Dark themed Minecraft recipe book web app.
Background color #0f0f0f, card surface #1c1c1c.
Header with logo "⚒️ FridgeCraft" and inventory bar showing ingredient icons with counts.
Filter pills row: All, Crops, Meat, Sweets, Soups, Special. Active pill is green #5dbb63.
Counter text "Can Craft: 3 / 12" in green.
Card grid 3 columns. Each card:
  - Square pixel-art food image placeholder (Minecraft style)
  - Food name bold white text "Bread"
  - Row of heart icons for hunger (5 red hearts)
  - Small ingredients list "Wheat ×3" in muted grey text
  - Green badge "Can Craft ✓" or grey badge "Need: Wheat ×2"
  - Subtle green border on craftable cards
Card hover: slightly lighter surface, subtle glow.
Overall feel: dark, clean, gaming aesthetic. Not pixel art style UI — modern dark theme with Minecraft content.
```

---

## Экран 2 — Farm (mf-craft, Farm tab)

```
Minecraft farming dashboard. Dark theme #0f0f0f background.
Two tabs at top: "🌾 Farm" (active, green underline) and "🔨 Crafting Table".
6 plot cards in a 3×2 grid. Each card surface #1c1c1c, rounded corners.

Empty plot card: grey dashed border, "+" button "Plant Crop", muted text "Empty Plot".

Growing plot card (example Wheat):
  - Emoji 🌾 large centered
  - Name "Wheat" bold
  - Circular progress ring (60% filled, green #5dbb63)
  - Countdown "0:18 remaining" in muted text
  - Disabled harvest button grey

Ready plot card:
  - Emoji 🌾 large with green glow animation
  - Name "Wheat"
  - "Ready to Harvest!" green text
  - Big green button "Harvest 🌾 ×3"

Right sidebar: "My Inventory" panel, dark surface, list of ingredients with emoji and count:
  🌾 Wheat ×5
  🥕 Carrot ×2
  💎 Emerald ×1

Bottom: total inventory count badge in header.
```

---

## Экран 3 — Crafting Table (mf-craft, Crafting Table tab)

```
Minecraft crafting table as modern web interface. Dark theme.
Two tabs: "🌾 Farm" and "🔨 Crafting Table" (active).
Three column layout:

Left column (25%): "Inventory" panel, dark surface #1c1c1c.
List of ingredients with emoji icons and quantities:
  🌾 Wheat ×8
  🥚 Egg ×2
  🍬 Sugar ×1
  💎 Emerald ×3

Center column (50%): "Recipes" list.
Each recipe row: food image, name, ingredient requirements.
Green row = can craft (all ingredients available): "🍞 Bread — Wheat ×3 — CRAFT"
Yellow row = almost (missing 1-2): "🎂 Cake — Need: Egg ×1 more"
Grey row = cannot craft: "🥧 Pumpkin Pie — Need: Sugar ×2, Pumpkin ×1"

Right column (25%): Selected recipe detail panel.
Large food image, name "Bread", lore description italic text.
Ingredient checklist: ✅ Wheat ×3 (have 8), ❌ Sugar ×1 (have 0).
Hunger: ❤️❤️❤️ (6/2 hunger points)
Big green "Craft It!" button at bottom, disabled if missing ingredients.
1 second progress bar animation when crafting.
```

---

## Экран 4 — Village Market (mf-trade)

```
Minecraft village trading post. Dark theme.
Page title "🏘️ Village Market" with subtitle "Trade your resources".

4 villager cards in a row:
  🟤 Farmer Grot — "Farmer" — trades crops for emeralds
  ⬜ Butcher Hans — "Butcher" — trades meat items
  🟣 Cleric Mira — "Cleric" — rare ingredients
  🧙 Wandering Trader — timer badge "Arrives in 3:42" (yellow)

Each villager card: surface #1c1c1c, rounded, profession emoji large, name, profession badge.
Green "Trade" button or yellow "Coming Soon" for wandering trader.

Below: expanded trading panel for selected villager (Farmer Grot).
Title "Farmer Grot's Trades" with his emoji.
List of trade offers, each as a row:
  [🌾 Wheat ×20] → [💎 Emerald ×1]  [Trade button — green if have enough, grey if not]
  [🥕 Carrot ×22] → [💎 Emerald ×1] [Trade button]
  [💎 Emerald ×1] → [🌾 Wheat ×20]  [Trade button]

Inventory reminder at bottom: "Your inventory: Wheat ×5, Emerald ×2"
Success toast notification example: "Trade complete! +1 Emerald"
```

---

## Что искать в результатах

После генерации обрати внимание на:

- Тёмная тема хорошо читается?
- Карточки выглядят как "игровой инвентарь"?
- Зелёный акцент #5dbb63 выглядит органично?
- Таймеры/прогресс-бары понятны?

Скриншоты → в эту же папку `docs/design/`
