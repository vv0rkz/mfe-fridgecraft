# FridgeCraft — Задачи по версиям

Формат: каждая версия = один работающий результат который можно проверить.
Отмечай выполненные: `- [x]`

---

## 🗺️ Концепция

**FridgeCraft** — Minecraft-тематическое веб-приложение с полноценным game loop.

```
🌾 Вырасти ингредиенты (Farm)
     ↓
🏘️ Обменяй у жителей (Village Market)
     ↓
🔨 Скрафти еду в сетке 3×3 (Crafting Table)
     ↓
📖 Открой новые рецепты (Recipe Book)
```

| Экран | Путь | Remote |
|-------|------|--------|
| 📖 Recipe Book | `/` | mf-recipes |
| 🌾 Farm | `/craft/farm` | mf-craft |
| 🔨 Crafting Table | `/craft/table` | mf-craft |
| 🏘️ Village Market | `/trade` | mf-trade |

### Game Loop

```
Старт: 2 грядки разблокированы, знаешь только рецепт Bread
    ↓
Посади Wheat → собери урожай (real-time таймер) → +3 Wheat в инвентарь
    ↓
Продай Wheat у Farmer → +1 Emerald
    ↓
Купи 3-ю грядку (💎×3) → теперь можно растить больше культур
    ↓
Поставь Wheat×3 в сетке 3×3 → скрафти Bread ✅
    ↓
Поэкспериментируй с другими комбинациями → "Recipe Discovered! 🎉 Mushroom Stew"
    ↓
Или купи Recipe Book у Cleric → открой рецепт сразу
```

### Стейт в localStorage

```
'fridgecraft:inventory'       → { "Wheat": 5, "Emerald": 1 }
'fridgecraft:farm'            → [{ id, cropId, plantedAt, unlockedAt }]
'fridgecraft:plots-unlocked'  → 2
'fridgecraft:recipes-known'   → ["bread"]
'fridgecraft:crafting-grid'   → [null, "Wheat", null, ...]  // 9 ячеек
```

**Инвентарь** живёт в shell — все remotes читают/пишут через CustomEvents.

---

## 🗺️ Roadmap

```
v0.x — Скелет монорепо и Module Federation   ✅
v0.5 — Дизайн: токены, тёмная тема
v1.x — mf-recipes: Recipe Book (известные/неизвестные рецепты)
v2.x — mf-craft: Farm + Crafting Table 3×3
v2.5 — Выделяем ui-kit из написанного
v3.x — mf-trade: Village Market (торговля + разблокировка грядок)
v4.x — Полировка
```

> **Принцип:** сначала делаем — потом абстрагируем.

---

## v0.x — Скелет ✅

### v0.1 — Монорепо ✅
- [x] `pnpm-workspace.yaml` с `apps/*` и `packages/*`
- [x] Корневой `package.json` со скриптом `dev`
- [x] Папки: `apps/shell`, `apps/mf-recipes`, `apps/mf-cart`, `apps/mf-craft`, `packages/ui-kit`
- [x] `pnpm dev` из корня — нет ошибок

### v0.2 — Webpack + Module Federation ✅
- [x] Зависимости в shell и mf-recipes
- [x] `webpack.config.js` с `ModuleFederationPlugin` в обоих
- [x] `src/index.ts`, `bootstrap.tsx`, `App.tsx`, `public/index.html`
- [x] `tsconfig.json` в shell и mf-recipes

### v0.3 — Shell загружает remote ✅
- [x] `react-router-dom` в `shared`
- [x] `RecipesApp.tsx` с `React.lazy` + `Suspense`
- [x] CORS-заголовки на dev-серверах
- [x] `tsconfig paths` для Ctrl+Click навигации

**Результат:** `localhost:3000` показывает контент из mf-recipes ✅

---

## v0.5 — Дизайн

**Цель:** зафиксировать визуальный язык до начала вёрстки.

- [ ] Референсы из v0.dev → скриншоты в `docs/design/`
- [ ] Создать `apps/shell/src/styles/tokens.css`:

```css
/* Цвета */
--color-bg:           #0f0f0f;
--color-surface:      #1c1c1c;
--color-surface-2:    #2a2a2a;
--color-border:       #3a3a3a;
--color-accent:       #5dbb63;
--color-accent-hover: #4aa350;
--color-gold:         #f5c542;   /* Emerald / валюта */
--color-text:         #e8e8e8;
--color-text-muted:   #888888;
--color-danger:       #e05252;

/* Типографика */
--font-base: 'Inter', sans-serif;
--text-xs: 12px;  --text-sm: 14px;  --text-base: 16px;
--text-lg: 20px;  --text-xl: 24px;  --text-2xl: 32px;

/* Отступы */
--space-1: 4px;   --space-2: 8px;   --space-3: 12px;
--space-4: 16px;  --space-6: 24px;  --space-8: 32px;

/* Радиусы */
--radius-sm: 4px;  --radius-md: 8px;  --radius-lg: 12px;
--shadow-card: 0 2px 8px rgba(0,0,0,0.4);
```

- [ ] Создать `apps/shell/src/styles/global.css` — reset + подключение токенов
- [ ] Добавить `css-loader` + `style-loader` в webpack shell и mf-recipes
- [ ] Подключить `tokens.css` в `bootstrap.tsx` обоих

**Результат:** `localhost:3000` имеет тёмный фон #0f0f0f ✓

---

## v1.x — mf-recipes: Recipe Book

### v1.0 — Стейт: инвентарь + известные рецепты в shell ✅

- [x] Создать `apps/shell/src/store/inventoryStore.ts` (Zustand):
  ```ts
  type InventoryStore = {
    inventory: Record<string, number>     // { "Wheat": 5 }
    knownRecipes: string[]                // ["bread", "mushroom_stew"]
    unlockedPlots: number                 // 2
    addItem: (item: string, count: number) => void
    removeItem: (item: string, count: number) => void
    discoverRecipe: (recipeId: string) => void
    unlockPlot: () => void
  }
  ```
- [x] Zustand persist middleware → автосохранение в localStorage
- [x] При изменении диспатч `CustomEvent 'fridgecraft:inventory-updated'`
- [x] Начальное состояние: `{ knownRecipes: ["bread"], unlockedPlots: 2 }`
- [x] `window.__fridgecraft = { useInventoryStore }` — доступ из remotes
- [x] Типизация в `types.d.ts`: `Window.__fridgecraft` + `WindowEventMap`

**Результат:** DevTools → Application → localStorage → ключ `fridgecraft-store` ✅

---

### v1.1 — Данные рецептов

- [ ] Создать `apps/mf-recipes/src/data/recipes.ts` — 12 Minecraft-блюд:

| id | Название | Ингредиенты | Голод |
|----|----------|-------------|-------|
| bread | Bread | Wheat×3 | 5 |
| cake | Cake | Wheat×3, Egg×2, Sugar×2, Milk×3 | 14 |
| mushroom_stew | Mushroom Stew | Brown Mushroom×1, Red Mushroom×1, Bowl×1 | 6 |
| pumpkin_pie | Pumpkin Pie | Pumpkin×1, Sugar×1, Egg×1 | 8 |
| baked_potato | Baked Potato | Potato×1 (furnace) | 5 |
| cooked_chicken | Cooked Chicken | Raw Chicken×1 (furnace) | 6 |
| cooked_beef | Cooked Beef (Steak) | Raw Beef×1 (furnace) | 8 |
| golden_apple | Golden Apple | Apple×1, Gold Ingot×8 | 4 |
| golden_carrot | Golden Carrot | Carrot×1, Gold Nugget×8 | 6 |
| melon_slice | Melon Slice | Melon×1 | 2 |
| cookie | Cookie | Wheat×2, Cocoa Beans×1 | 2 |
| beetroot_soup | Beetroot Soup | Beetroot×6, Bowl×1 | 6 |

- [ ] Добавить паттерн крафта для каждого рецепта (9 ячеек, null = пусто):
  ```ts
  type Recipe = {
    id: string
    name: string
    emoji: string
    imageUrl: string
    category: 'crops' | 'meat' | 'sweets' | 'soups' | 'special'
    hungerRestored: number
    saturation: number
    craftingPattern: (string | null)[]  // массив 9 элементов, сетка 3×3
    shapeless: boolean                  // true = порядок не важен (Cookie, Stew)
    description: string
  }
  ```

**Результат:** 12 рецептов с паттернами крафта готовы

---

### v1.2 — RecipeCard + CatalogPage

- [ ] Создать `src/components/RecipeCard/RecipeCard.tsx`:
  - Minecraft-спрайт (img с `minecraft.wiki`)
  - Название + сердечки голода (♥ × N)
  - Бейдж категории
  - Состояния:
    - ✅ **Known + Can Craft** — зелёная рамка, кнопка "Craft →"
    - 🔵 **Known + Missing** — синяя рамка, текст "Need: Wheat ×2"
    - 🔒 **Unknown** — размытое фото, "???" вместо названия, "Discover this recipe"
- [ ] `CatalogPage` — сетка 3 колонки
- [ ] Клик на Known карточку → `/recipes/:id`
- [ ] Клик на Unknown карточку → подсказка "Try crafting it or buy from Cleric"

**Результат:** известные рецепты видны, неизвестные — заблюрены с "???"

---

### v1.3 — FilterBar + счётчики

- [ ] Pill-кнопки: All, Crops, Meat, Sweets, Soups, Special
- [ ] Счётчики в хедере фильтра: "Can Craft: 1 / 12 | Discovered: 3 / 12"
- [ ] Фильтр "Can Craft" — показывает только то что можно скрафтить прямо сейчас

---

### v1.4 — RecipeDetailPage

- [ ] Route `/recipes/:id` (только для Known рецептов)
- [ ] Левая колонка: большой спрайт + лор-описание + характеристики
- [ ] Правая колонка sticky:
  - Паттерн крафта: мини-превью сетки 3×3 (статичный, показывает раскладку)
  - Чеклист ингредиентов: ✅ Wheat ×3 (have 5) / ❌ Sugar ×2 (have 0)
  - Кнопка "Open Crafting Table →" — переход на `/craft/table`
  - Кнопка "Get Ingredients →" — переход на `/trade`

---

### v1.5 — Header в shell

- [ ] `apps/shell/src/components/Header/Header.tsx`
- [ ] Логотип "⚒️ FridgeCraft" слева
- [ ] Навигация: Recipe Book | Farm | Trade
- [ ] Инвентарь справа: топ-4 ингредиента (emoji + число) + "... N more"
- [ ] 💎 Emerald счётчик отдельно (валюта)
- [ ] Слушает `fridgecraft:inventory-updated` → обновляет отображение

---

## v2.x — mf-craft: Farm + Crafting Table 3×3

### v2.0 — Webpack для mf-craft

- [ ] `apps/mf-craft/webpack.config.js` (порт 3003) + CORS
- [ ] Добавить в shell как remote `craft`
- [ ] `tsconfig paths`: `craft/*` → `../mf-craft/src/*`
- [ ] `App.tsx` с двумя табами через `react-router-dom`: Farm | Crafting Table

---

### v2.1 — Farm: данные + стор

- [ ] Создать `src/data/crops.ts` — 8 культур:

| id | Emoji | Название | Время роста | Урожай |
|----|-------|----------|-------------|--------|
| wheat | 🌾 | Wheat | 45 сек | ×3 |
| carrot | 🥕 | Carrot | 40 сек | ×3 |
| potato | 🥔 | Potato | 40 сек | ×2 |
| melon | 🍉 | Melon | 60 сек | ×1 |
| mushroom | 🍄 | Brown Mushroom | 30 сек | ×2 |
| sugar_cane | 🎋 | Sugar Cane | 50 сек | ×2 |
| beetroot | 🫚 | Beetroot | 55 сек | ×3 |
| pumpkin | 🎃 | Pumpkin | 70 сек | ×1 |

- [ ] Стор фермы читает `unlockedPlots` из shell-стора
- [ ] `plantCrop(plotId, cropId)` — сохраняет `plantedAt: Date.now()`
- [ ] `harvestCrop(plotId)` — вызывает `addItem()` shell-стора

---

### v2.2 — Farm: UI с таймерами

- [ ] `src/components/PlotCard/PlotCard.tsx`:
  - **Locked** 🔒: тёмная карточка, цена разблокировки `💎 ×N`, кнопка "Unlock"
  - **Empty**: пунктирная рамка, кнопка "🌱 Plant" → выбор культуры из списка
  - **Growing**: emoji культуры + circular progress bar + `0:24 remaining`
  - **Ready** ✅: пульсирующий зелёный контур + `"Harvest 🌾 ×3"` кнопка
- [ ] 9 карточек (3×3 сетка): 2 разблокированы, 7 заперты с нарастающей ценой
- [ ] `useEffect` + `setInterval(1000)` + cleanup — обновление таймеров
- [ ] Таймер считается от `plantedAt` timestamp — работает после перезагрузки

**Проверка:** посадил Wheat → закрыл вкладку → открыл через минуту → Wheat готов

---

### v2.3 — Crafting Table: сетка 3×3

**Цель:** настоящий Minecraft крафт

- [ ] `src/pages/CraftingTablePage.tsx`:
  - **Слева**: инвентарь — список ингредиентов с количеством (клик → выбрать)
  - **Центр**: сетка 3×3 (`CraftingGrid`) + стрелка → результат
  - **Справа**: слот результата + кнопка "Craft!" + название результата

- [ ] `src/components/CraftingGrid/CraftingGrid.tsx`:
  - 9 ячеек, каждая принимает ингредиент
  - Клик на ячейку: если выбран ингредиент в инвентаре — ставим его
  - Правый клик / повторный клик — убрать ингредиент
  - При изменении сетки → `checkRecipe(grid)` → показываем результат

- [ ] `src/utils/recipeEngine.ts` — логика матчинга:
  ```ts
  // Shaped recipe: паттерн точный (Bread = Wheat в первой строке)
  // Shapeless recipe: набор ингредиентов без учёта позиции (Cookie, Stew)
  function checkRecipe(grid: (string | null)[]): Recipe | null
  ```

- [ ] При успешном крафте неизвестного рецепта:
  - Toast: "🎉 Recipe Discovered! Mushroom Stew"
  - Вызов `discoverRecipe(recipeId)` в shell-сторе

- [ ] При клике "Craft!": `-ингредиенты` из инвентаря, `+1 результат`

**Результат:**
- Поставил Wheat×3 в первую строку → справа появился 🍞 Bread
- Поставил незнакомую комбинацию → "Recipe Discovered! 🎉"
- Bought plot: кнопка "Unlock Plot 💎×3" в Farm → `-3 Emerald`, `+1 разблокированная грядка`

---

## v2.5 — Выделяем ui-kit

- [ ] Ревью mf-recipes + mf-craft — выписать повторяющиеся элементы
- [ ] Ожидаемо: `Button`, `Badge`, `ProgressBar` (circular + linear), `Card`, `Tooltip`
- [ ] Настроить `packages/ui-kit/package.json` + `tsconfig.json`
- [ ] Перенести компоненты, заменить импорты
- [ ] Storybook: `pnpm add -D @storybook/react --filter ui-kit`
- [ ] Stories: все варианты каждого компонента

**Результат:** Storybook запускается, оба remote используют ui-kit

---

## v3.x — mf-trade: Village Market

### v3.0 — Webpack для mf-trade

- [ ] Переименовать/перенастроить `apps/mf-cart` → `apps/mf-trade` (порт 3002)
- [ ] Добавить как remote в shell
- [ ] `tsconfig paths`: `trade/*` → `../mf-trade/src/*`

---

### v3.1 — Данные жителей + сделки

- [ ] `src/data/villagers.ts` — 4 жителя:

**🟤 Farmer Grot**
- `Wheat×20` → `Emerald×1`
- `Carrot×22` → `Emerald×1`
- `Potato×26` → `Emerald×1`
- `Emerald×1` → `Wheat×20` (обратный обмен)

**⬜ Butcher Hans**
- `Raw Chicken×14` → `Emerald×1`
- `Emerald×1` → `Cooked Chicken×8`
- `Emerald×1` → `Raw Beef×7`

**🟣 Cleric Mira**
- `Emerald×1` → `Sugar×5`
- `Emerald×2` → `Cocoa Beans×3`
- `Emerald×3` → **Recipe Book** (открывает случайный неизвестный рецепт)

**🧙 Wandering Trader** (появляется каждые 5 минут, таймер)
- `Emerald×5` → `Pumpkin×1` (редкий)
- `Emerald×4` → `Red Mushroom×2` (редкий)
- `Emerald×7` → **Recipe Book — Rare** (открывает Golden Apple или Golden Carrot)

---

### v3.2 — Village Market: UI

- [ ] `src/pages/MarketPage.tsx`:
  - 4 карточки жителей
  - Wandering Trader: countdown "Arrives in 3:42" / "Here now! (leaves in 1:20)"
  - Клик → раскрывается панель сделок

- [ ] `src/components/TradePanel/TradePanel.tsx`:
  - Список сделок: `[🌾 Wheat ×20]` `→` `[💎 Emerald ×1]` `[Trade]`
  - Кнопка "Trade" — зелёная если хватает, серая если нет, красный tooltip что не хватает
  - После сделки: `+ингредиент`, `-цена`, toast "Trade complete!"

- [ ] Разблокировка грядок прямо на странице Market (у Farmer):
  - Секция "Buy Farm Plots": `Plot #3 — 💎×3` | `Plot #4 — 💎×5` | ...

**Результат:** продал Wheat → получил Emerald → купил Recipe Book → открыл новый рецепт 🎉

---

## v4.x — Полировка

### v4.1 — ErrorBoundary
- [ ] Обернуть каждый remote в `ErrorBoundary` + `Suspense`
- [ ] Fallback: "⚠️ This area is currently unavailable. Try refreshing."
- [ ] Проверка: остановить mf-recipes → shell показывает fallback, craft и trade работают

### v4.2 — Skeleton loading
- [ ] `Skeleton` в ui-kit
- [ ] RecipeCard Skeleton (пока грузится каталог)
- [ ] PlotCard Skeleton (пока инициализируется Farm)

### v4.3 — README + демо
- [ ] `README.md`: концепция, скриншоты, инструкция запуска
- [ ] Скриншоты в `docs/screenshots/`
- [ ] GIF: gameplay-флоу Farm → Craft (открытие рецепта) → Trade → Recipe Book

### v4.4 — JSON-конфиг роутинга для микрофронтов
- [ ] Вынести маршруты shell в JSON/TS-конфиг (path → remote + basePath)
- [ ] Каждый remote описывает свои пути (например `recipes.routes.json`)
- [ ] Shell читает конфиг и строит `<Routes>` динамически
- [ ] Убрать хардкод `path="*"` / `path="/recipes/*"` из shell App.tsx

**Результат:** добавление нового remote = правка конфига, без изменений shell-кода

---

## Правила работы с задачами

1. **Одна версия = одна задача.** Не делать v1.2 и v1.3 за раз.
2. **Проверяй результат** каждой версии прежде чем идти дальше.
3. **ui-kit не трогаем** до v2.5.
4. **Текущая задача:** v1.1 — Данные рецептов

---

*Обновляй "Текущая задача" когда переходишь к следующей версии*
