# FridgeCraft — Задачи по версиям

Формат: каждая версия = один работающий результат который можно проверить.
Отмечай выполненные: `- [x]`

---

## 🗺️ Roadmap

```
v0.x — Скелет монорепо и Module Federation   ✅
v0.5 — Дизайн: референсы, токены, макет
v1.x — mf-recipes: каталог и детальная страница
v1.5 — Выделяем ui-kit из того что написали
v2.x — mf-cart: корзина и заказ
v3.x — mf-craft: CraftMode (killer-фича)
v4.x — Интеграция и полировка
```

> **Принцип:** сначала делаем — потом абстрагируем.
> ui-kit появляется когда видим повторение, а не заранее.

---

## v0.x — Скелет ✅

### v0.1 — Монорепо ✅
- [x] Создать `pnpm-workspace.yaml` с `apps/*` и `packages/*`
- [x] Создать корневой `package.json` со скриптом `"dev": "pnpm --parallel -r dev"`
- [x] Создать папки: `apps/shell`, `apps/mf-recipes`, `apps/mf-cart`, `apps/mf-craft`, `packages/ui-kit`
- [x] В каждой папке `pnpm init`
- [x] `pnpm dev` из корня — нет ошибок

---

### v0.2 — Webpack + Module Federation ✅
- [x] Зависимости в shell и mf-recipes (`react`, `react-dom`, `react-router-dom`, `webpack`, `@module-federation/enhanced`, etc.)
- [x] `apps/shell/webpack.config.js` с `ModuleFederationPlugin` (remotes: recipes@3001)
- [x] `apps/shell/src/index.ts`, `bootstrap.tsx`, `App.tsx`, `public/index.html`
- [x] `apps/mf-recipes/webpack.config.js` с `exposes: { './App': './src/App' }`
- [x] `apps/mf-recipes/src/index.ts`, `bootstrap.tsx`, `App.tsx`
- [x] `tsconfig.json` в shell и mf-recipes

**Результат:** `localhost:3000` — Shell, `localhost:3001` — Recipes ✅

---

### v0.3 — Shell загружает remote ✅
- [x] `react-router-dom` в `shared` в обоих webpack конфигах
- [x] `apps/shell/src/remotes/RecipesApp.tsx` с `React.lazy` + `Suspense`
- [x] `App.tsx` shell: `BrowserRouter` + `Routes` + `Route path="/" → RecipesApp`
- [x] `apps/shell/src/types.d.ts` с `declare module 'recipes/App'`
- [x] CORS-заголовки на dev-серверах (shell + mf-recipes)
- [x] `tsconfig paths`: `recipes/*` → `../mf-recipes/src/*` (Ctrl+Click навигация)
- [ ] Повторить для mf-cart и mf-craft — при работе над v2/v3

**Результат:** `localhost:3000` показывает контент из mf-recipes ✅

---

## v0.5 — Дизайн

**Цель:** зафиксировать внешний вид до начала вёрстки. Не пишем компоненты — только токены и референсы.

- [ ] Выбрать референс (v0.dev / Dribbble / Figma Community) — скриншот в `docs/design/reference.png`
- [ ] Зафиксировать цветовую палитру в `docs/design/tokens.md`:
  - Background: `#F7F8FA`
  - Surface (карточки): `#FFFFFF`
  - Accent: `#22C55E` (зелёный)
  - Text primary: `#111827`
  - Text secondary: `#6B7280`
  - Border: `#E5E7EB`
- [ ] Зафиксировать типографику: шрифт, размеры (xs/sm/base/lg/xl/2xl), веса
- [ ] Создать `apps/mf-recipes/src/styles/tokens.css` с CSS-переменными
- [ ] Создать `apps/shell/src/styles/global.css` — reset + подключение токенов

**Результат:** есть `tokens.css` с переменными, есть скриншот референса в `docs/`

---

## v1.x — mf-recipes

### v1.0 — MSW моки для рецептов
**Цель:** MSW перехватывает запросы, возвращает список рецептов

- [ ] Установить MSW: `pnpm add -D msw --filter mf-recipes`
- [ ] `npx msw init public/ --save` в папке mf-recipes
- [ ] Создать `src/mocks/handlers.ts` — `GET /api/recipes` и `GET /api/recipes/:id`
- [ ] Создать `src/mocks/browser.ts` — `setupWorker(...handlers)`
- [ ] Подключить в `bootstrap.tsx` через `enableMocking().then(...)`
- [ ] Минимум 6 рецептов (категории: breakfast, lunch, dinner; сложность: easy/medium/hard)

**Проверка:** DevTools → Network → `GET /api/recipes` → 200 с данными

---

### v1.1 — RTK Query
**Цель:** данные из MSW приходят через RTK Query

- [ ] Установить: `@reduxjs/toolkit`, `react-redux` в mf-recipes
- [ ] Создать `src/api/recipesApi.ts` — `createApi` с `getRecipes` и `getRecipeById`
- [ ] Создать `src/store.ts` — `configureStore`
- [ ] Обернуть `App` в `<Provider>` в `bootstrap.tsx`
- [ ] Создать `src/pages/CatalogPage.tsx` — вызвать `useGetRecipesQuery`, вывести названия
- [ ] Добавить route `/` → `CatalogPage` в `App.tsx` mf-recipes

**Результат:** `CatalogPage` показывает список названий рецептов

---

### v1.2 — CSS-инфраструктура + CatalogPage layout
**Цель:** настроить CSS Modules, подключить токены, сделать базовую вёрстку страницы

- [ ] Добавить `css-loader` + `style-loader` в webpack mf-recipes и shell
- [ ] Подключить `tokens.css` в `bootstrap.tsx` mf-recipes
- [ ] Сетка каталога: 3 колонки на десктопе, 2 на планшете, 1 на мобильном
- [ ] Фон страницы `#F7F8FA`, заголовок "Рецепты", счётчик "N рецептов"

**Результат:** пустая сетка со стилями из токенов

---

### v1.3 — RecipeCard
**Цель:** карточка рецепта с дизайном

- [ ] Создать `src/components/RecipeCard/RecipeCard.tsx`
  - пропсы: `id`, `name`, `time`, `calories`, `difficulty`, `category`, `imageUrl`
- [ ] Создать `RecipeCard.module.css` — белая карточка, тень, скруглённые углы
- [ ] Бейджи difficulty и category — цветные pill-кнопки
- [ ] Hover-эффект на карточке
- [ ] Клик → переход на `/recipes/:id`

**Результат:** `localhost:3001` — 6 карточек с фото, названием, временем, калориями

---

### v1.4 — FilterBar
**Цель:** фильтрация рецептов по категории

- [ ] Создать `src/components/FilterBar/FilterBar.tsx` — pill-кнопки: All, Breakfast, Lunch, Dinner, Easy, Under 30 min
- [ ] Активная кнопка — зелёная (`--color-accent`), неактивная — серая
- [ ] Фильтрация на клиенте по `category` и `difficulty`

**Результат:** клик на "Breakfast" — только завтраки. "All" — все рецепты.

---

### v1.5 — RecipeDetailPage
**Цель:** детальная страница рецепта

- [ ] Добавить route `/recipes/:id` в `App.tsx` mf-recipes
- [ ] Создать `src/pages/RecipeDetailPage.tsx`
- [ ] Левая колонка (60%): hero фото + название + бейджи + шаги приготовления
- [ ] Правая колонка (40%) sticky: ингредиенты с чекбоксами + сумма + кнопка "Order Products"
- [ ] Кнопка "Order Products":
  ```js
  window.dispatchEvent(new CustomEvent('fridgecraft:add-to-cart', { detail: { ingredients } }))
  ```
- [ ] "← Назад к каталогу" ссылка

**Результат:** открываешь рецепт → видишь ингредиенты → "Order Products" → в консоли событие

---

### v1.6 — Header в shell
**Цель:** общий хедер с навигацией и счётчиком корзины

- [ ] Создать `apps/shell/src/components/Header/Header.tsx`
- [ ] Логотип "FridgeCraft" слева
- [ ] Кнопка "CraftMode" — зелёная — `/craft`
- [ ] Иконка корзины с бейджем (количество) справа
- [ ] shell слушает `fridgecraft:add-to-cart` → увеличивает счётчик

**Результат:** хедер на всех страницах. "Order Products" → счётчик растёт.

---

## v1.5 — Выделяем ui-kit

**Цель:** смотрим что повторяется в mf-recipes, выносим в пакет

- [ ] Провести ревью mf-recipes — выписать повторяющиеся UI-элементы
- [ ] Настроить `packages/ui-kit/package.json`: `name: "@fridgecraft/ui-kit"`, `main`, `types`
- [ ] Создать `packages/ui-kit/tsconfig.json` с `"declaration": true`
- [ ] Перенести `Button` (из Header/FilterBar) → `packages/ui-kit/src/Button/`
- [ ] Перенести `Badge` (difficulty/category бейджи) → `packages/ui-kit/src/Badge/`
- [ ] Перенести `Card` (основа RecipeCard) → `packages/ui-kit/src/Card/`
- [ ] Создать `packages/ui-kit/src/index.ts` — экспортирует всё
- [ ] Установить ui-kit в mf-recipes: `pnpm add @fridgecraft/ui-kit --workspace --filter mf-recipes`
- [ ] Установить ui-kit в shell: `pnpm add @fridgecraft/ui-kit --workspace --filter shell`
- [ ] Заменить локальные компоненты в mf-recipes на импорты из `@fridgecraft/ui-kit`

**Результат:** mf-recipes работает как раньше, но использует компоненты из ui-kit

---

## v2.x — mf-cart

### v2.0 — Webpack + MSW для mf-cart
**Цель:** настроить mf-cart как microfrontend, подключить моки

- [ ] Настроить webpack в mf-cart (аналогично mf-recipes, порт 3002)
- [ ] Добавить mf-cart как remote в shell (порт 3002)
- [ ] Установить MSW в mf-cart
- [ ] Handlers: `GET /api/cart`, `POST /api/cart/add`, `DELETE /api/cart/:id`
- [ ] Мок `GET /api/stores/prices?product=...` — цена в разных магазинах

---

### v2.1 — CartPage: список продуктов
- [ ] shell ловит `fridgecraft:add-to-cart` → сохраняет в localStorage → навигирует на `/cart`
- [ ] `CartPage` читает localStorage, показывает продукты
- [ ] Группировка по рецепту (заголовок + крестик убрать группу)
- [ ] Чекбокс "есть дома" — зачёркивает продукт, убирает из суммы
- [ ] Счётчик количества `[−][1][+]`

**Результат:** рецепт → "Order Products" → попасть в корзину → список продуктов

---

### v2.2 — Выбор магазина и заказ
- [ ] Секция выбора магазина: ВкусВилл, Пятёрочка, Лента
- [ ] При выборе магазина — пересчёт цен через MSW
- [ ] Итого: subtotal + delivery + total
- [ ] `POST /api/cart/order` → мок с `orderId` → "Заказ принят! #orderId"

**Результат:** полный флоу рецепт → корзина → магазин → заказ → подтверждение

---

## v3.x — mf-craft

### v3.0 — Webpack + MSW для mf-craft
- [ ] Настроить webpack в mf-craft (порт 3003)
- [ ] Handler: `GET /api/craft/match?ingredients[]=...&tools[]=...`
- [ ] 6 рецептов с разным `matchPercentage`, `missingIngredients`, `requiredTools`

---

### v3.1 — CraftPage: три колонки
- [ ] `src/pages/CraftPage.tsx` — layout `25% / 30% / 45%`, `height: 100vh - header`
- [ ] Каждая колонка `overflow-y: auto`

---

### v3.2 — FridgePanel (левая колонка)
- [ ] Поиск по ингредиентам
- [ ] Клик — выделяет (зелёная рамка), выделенные — в начале списка

---

### v3.3 — KitchenPanel (центральная колонка)
- [ ] Тайлы инструментов: Pan, Pot, Oven, Knife, Blender
- [ ] Активный — зелёный, неактивный — серый

---

### v3.4 — ResultsPanel (правая колонка)
- [ ] RTK Query → `/api/craft/match` при изменении ингредиентов/инструментов
- [ ] Карточка: фото + название + progress bar (% match) + "Missing" + "Requires"
- [ ] Сортировка по % убыванию
- [ ] "Order missing" → `fridgecraft:add-to-cart` → корзина

**Результат:** Tomato + Egg + Pan → рецепты с %. "Order missing" → корзина.

---

## v4.x — Полировка

### v4.1 — ErrorBoundary
- [ ] `ErrorBoundary` в shell — обёртка каждого remote
- [ ] Fallback: "Сервис временно недоступен"
- [ ] Проверка: остановить mf-recipes → shell показывает fallback, остальные работают

### v4.2 — Skeleton loading
- [ ] `Skeleton` компонент в ui-kit
- [ ] RecipeCard Skeleton, ResultsPanel Skeleton, CartPage Skeleton

### v4.3 — README и деплой
- [ ] `README.md` с описанием, скриншотами, инструкцией
- [ ] Скриншоты всех экранов в `docs/screenshots/`
- [ ] Проверить `pnpm dev` с нуля (чистый clone)

---

## Правила работы с задачами

1. **Одна версия = одна задача в Cursor.** Не делать v1.3 и v1.4 за раз.
2. **Проверяй результат каждой версии** прежде чем идти дальше.
3. **ui-kit не трогаем** пока не закончена хотя бы v1.5 (RecipeDetailPage).
4. **Застрял?** Напиши: `Я делаю задачу v1.3 FridgeCraft. Застрял на [шаг]. Вот код: [код]`
5. **Текущая задача:** v0.5

---

*Обновляй "Текущая задача" когда переходишь к следующей версии*
