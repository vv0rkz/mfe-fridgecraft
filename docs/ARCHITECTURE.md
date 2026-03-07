# FridgeCraft — Архитектура

## Концепция

Пользователь выбирает рецепт → видит ингредиенты → заказывает продукты.
Killer-фича: **CraftMode** — вбиваешь что есть в холодильнике + какие инструменты, получаешь блюда с % совпадения.

---

## Микрофронтенды

```
                    ┌─────────────────────────────────┐
                    │         shell (host)             │
                    │  порт 3000                       │
                    │  - роутинг                       │
                    │  - хедер                         │
                    │  - оркестрация событий           │
                    └────────┬────────┬────────┬───────┘
                             │        │        │
              ┌──────────────┘        │        └──────────────┐
              ▼                       ▼                        ▼
   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
   │   mf-recipes     │  │    mf-cart       │  │   mf-craft       │
   │   порт 3001      │  │    порт 3002     │  │   порт 3003      │
   │   GraphQL/Apollo │  │    RTK Query     │  │   RTK Query      │
   │   - каталог      │  │    - корзина     │  │   - CraftMode    │
   │   - детальная    │  │    - заказ       │  │   - матчинг      │
   │   - редактор     │  │    - статус      │  │                  │
   └──────────────────┘  └──────────────────┘  └──────────────────┘

   Все три remote используют:
   ┌──────────────────────────────────────────────────────────────┐
   │  @fridgecraft/ui-kit (npm-пакет)                            │
   │  Button, Card, Input, Badge, Chip, ProgressBar, Skeleton    │
   └──────────────────────────────────────────────────────────────┘
```

---

## Коммуникация

Remotes **не знают друг о друге**. Только через shell.

```
mf-recipes                shell                  mf-cart
    │                       │                       │
    │  dispatchEvent        │                       │
    │ 'fridgecraft:         │                       │
    │  add-to-cart'         │                       │
    │──────────────────────►│                       │
    │                       │  navigate('/cart')    │
    │                       │  localStorage.set()   │
    │                       │──────────────────────►│
    │                       │                       │  читает
    │                       │                       │  localStorage
```

### Данные через localStorage (MVP)

```ts
// Структура в localStorage ключ 'fridgecraft:cart'
{
  items: [
    {
      recipeId: string,
      recipeName: string,
      ingredients: [
        { name: string, amount: string, price: number, have: boolean }
      ]
    }
  ]
}
```

---

## Module Federation

### shell webpack.config.js (ключевые части)
```js
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    recipes: 'recipes@http://localhost:3001/remoteEntry.js',
    cart:    'cart@http://localhost:3002/remoteEntry.js',
    craft:   'craft@http://localhost:3003/remoteEntry.js',
  },
  shared: {
    react:             { singleton: true, requiredVersion: '^18.0.0' },
    'react-dom':       { singleton: true, requiredVersion: '^18.0.0' },
    'react-router-dom':{ singleton: true },
  },
})
```

### remote webpack.config.js (пример mf-recipes)
```js
new ModuleFederationPlugin({
  name: 'recipes',
  filename: 'remoteEntry.js',      // этот файл загружает shell
  exposes: {
    './App': './src/App',           // shell делает import('recipes/App')
  },
  shared: { /* те же */ }
})
```

### Почему singleton: true
Два экземпляра React = сломанные хуки. `singleton: true` гарантирует один экземпляр на всё приложение.

---

## Паттерн адаптеров для магазинов

```ts
interface StoreAdapter {
  searchProduct(name: string): Promise<Product[]>;
  getPrice(productId: string): Promise<number>;
}

// Реальный
class VkusvillAdapter implements StoreAdapter { ... }

// Мок (MSW)
class PyaterochkaAdapter implements StoreAdapter { ... }
```

Компонент `CartPage` работает через интерфейс — не знает о конкретном магазине.

---

## Порядок запуска

```bash
# Из корня fridgecraft/
pnpm dev
# Запускает все 4 devServer параллельно

# Проверка:
# http://localhost:3000 — shell
# http://localhost:3001 — mf-recipes (standalone)
# http://localhost:3002 — mf-cart (standalone)
# http://localhost:3003 — mf-craft (standalone)
```

---

## Частые ошибки

| Ошибка | Причина | Решение |
|--------|---------|---------|
| Shared module is not available | Версии React не совпадают | Проверь requiredVersion в shared |
| Cannot read properties of undefined | Нет async boundary | index.ts — только import('./bootstrap') |
| Loading chunk failed | remote не запущен | Проверь все 4 процесса |
| Invalid hook call | Два React | singleton: true для react и react-dom |
| Module not found 'recipes/App' | Нет TS декларации | Добавь declare module в types.d.ts |
