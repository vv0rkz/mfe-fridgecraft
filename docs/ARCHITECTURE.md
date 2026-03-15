# FridgeCraft — Архитектура

## Концепция

**FridgeCraft** — Minecraft-тематическое веб-приложение.

```
🌾 Вырасти ингредиенты на ферме
     ↓
🏘️ Обменяй у жителей на редкие ингредиенты
     ↓
🔨 Скрафти еду на верстаке
     ↓
📖 Изучи рецепты в книге рецептов
```

---

## Микрофронтенды

```
                    ┌─────────────────────────────────┐
                    │         shell (host)             │
                    │  порт 3000                       │
                    │  - роутинг                       │
                    │  - хедер + навигация             │
                    │  - инвентарь (localStorage)      │
                    │  - оркестрация событий           │
                    └────────┬────────┬────────┬───────┘
                             │        │        │
              ┌──────────────┘        │        └──────────────┐
              ▼                       ▼                        ▼
   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
   │   mf-recipes     │  │    mf-trade      │  │   mf-craft       │
   │   порт 3001      │  │    порт 3002     │  │   порт 3003      │
   │                  │  │                  │  │                  │
   │  📖 Recipe Book  │  │  🏘️ Village     │  │  🌾 Farm         │
   │  - каталог еды   │  │     Market       │  │  - грядки        │
   │  - детальная     │  │  - 4 жителя      │  │  - таймеры роста │
   │  - "Can Craft?"  │  │  - торговля      │  │                  │
   │                  │  │  - Wandering     │  │  🔨 Crafting     │
   │                  │  │    Trader        │  │     Table        │
   │                  │  │    (таймер 5мин) │  │  - крафт еды     │
   └──────────────────┘  └──────────────────┘  └──────────────────┘

   Все три remote используют общие CSS-переменные из shell:
   ┌──────────────────────────────────────────────────────────────┐
   │  tokens.css (CSS Custom Properties)                         │
   │  --color-accent, --color-bg, --space-*, --radius-*, ...     │
   └──────────────────────────────────────────────────────────────┘

   После v2.5 — также @fridgecraft/ui-kit:
   ┌──────────────────────────────────────────────────────────────┐
   │  @fridgecraft/ui-kit (workspace npm-пакет)                  │
   │  Button, Card, Badge, ProgressBar, Skeleton                 │
   └──────────────────────────────────────────────────────────────┘
```

---

## Коммуникация через CustomEvents

Remotes **не знают друг о друге**. Только через shell.

```
mf-craft                   shell                  mf-recipes
    │                         │                       │
    │  'fridgecraft:          │                       │
    │   inventory-updated'    │                       │
    │  { Wheat: +3 }          │                       │
    │────────────────────────►│                       │
    │                         │  обновляет хедер      │
    │                         │  сохраняет localStorage│
    │                         │──────────────────────►│
    │                         │                       │  пересчитывает
    │                         │                       │  "Can Craft?"

mf-recipes                 shell                  mf-craft
    │                         │                       │
    │  'fridgecraft:          │                       │
    │   craft-item'           │                       │
    │  { recipeId: 'bread' }  │                       │
    │────────────────────────►│                       │
    │                         │  тратит ингредиенты   │
    │                         │  из инвентаря         │
    │                         │──────────────────────►│
    │                         │  'inventory-updated'  │
```

### Все события

| Событие | Кто диспатчит | Что делает shell |
|---------|--------------|------------------|
| `fridgecraft:inventory-updated` | mf-craft (harvest, craft) / mf-trade | Обновляет localStorage + хедер |
| `fridgecraft:craft-item` | mf-recipes, mf-craft | Тратит ингредиенты из инвентаря |
| `fridgecraft:trade-complete` | mf-trade | Обновляет инвентарь после сделки |

---

## Структура инвентаря (localStorage)

```ts
// ключ: 'fridgecraft:inventory'
type Inventory = Record<string, number>
// { "Wheat": 5, "Carrot": 2, "Emerald": 1, "Sugar": 3 }

// ключ: 'fridgecraft:farm'
type FarmState = {
  plots: Plot[]
}
type Plot = {
  id: string
  cropId: string | null
  plantedAt: number | null   // Date.now() timestamp
  harvested: boolean
}
```

---

## Module Federation

### shell webpack.config.js
```js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    recipes: 'recipes@http://localhost:3001/mf-manifest.json',
    trade:   'trade@http://localhost:3002/mf-manifest.json',
    craft:   'craft@http://localhost:3003/mf-manifest.json',
  },
  shared: {
    react:              { singleton: true, requiredVersion: '^19.0.0' },
    'react-dom':        { singleton: true, requiredVersion: '^19.0.0' },
    'react-router-dom': { singleton: true },
  },
})
```

### remote webpack.config.js (пример mf-craft)
```js
new ModuleFederationPlugin({
  name: 'craft',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
  },
  shared: { /* те же */ }
})
```

---

## Навигация

```
/                  → RecipesApp    (mf-recipes)
/recipes/:id       → RecipesApp    (mf-recipes, внутренний роут)
/craft             → redirect → /craft/farm
/craft/farm        → CraftApp      (mf-craft)
/craft/table       → CraftApp      (mf-craft, внутренний роут)
/trade             → TradeApp      (mf-trade)
```

---

## Дизайн-система

Тёмная тема, вдохновлённая Minecraft ночью.

```
Фон:         #0f0f0f  (почти чёрный)
Карточки:    #1c1c1c
Акцент:      #5dbb63  (зелёный, трава/Creeper)
Золото:      #f5c542  (Emerald/торговля)
Красный:     #e05252  (опасность/мало)
```

---

## Порядок запуска

```bash
pnpm dev
# http://localhost:3000 — shell (основной)
# http://localhost:3001 — mf-recipes (standalone)
# http://localhost:3002 — mf-trade (standalone)
# http://localhost:3003 — mf-craft (standalone)
```

---

## Частые ошибки

| Ошибка | Причина | Решение |
|--------|---------|---------|
| CORS policy blocked | Нет заголовков на dev-server | `headers: { 'Access-Control-Allow-Origin': '*' }` в devServer |
| Shared module is not available | Версии не совпадают | Проверь `requiredVersion` в shared |
| Cannot read properties of undefined | Нет async boundary | `index.ts` — только `import('./bootstrap')` |
| Loading chunk failed | Remote не запущен | Проверь все 4 процесса |
| Invalid hook call | Два экземпляра React | `singleton: true` для react и react-dom |
| Module not found 'recipes/App' | Нет TS декларации | `declare module` в `types.d.ts` или `tsconfig paths` |
