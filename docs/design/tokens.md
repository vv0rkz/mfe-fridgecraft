# FridgeCraft — Design Tokens

Зафиксированы на основе референсов из v0.dev (Screenshots 1-5).

---

## Цвета

### Базовые

| Токен | Значение | Где используется |
|-------|----------|-----------------|
| `--color-bg` | `#0a0a0a` | Фон страниц |
| `--color-surface` | `#1a1a1a` | Карточки, панели |
| `--color-surface-2` | `#252525` | Вложенные элементы, строки сделок |
| `--color-surface-hover` | `#2a2a2a` | Hover на карточках |
| `--color-border` | `#2a2a2a` | Границы карточек |
| `--color-border-dashed` | `#3a3a3a` | Пустые грядки (dashed border) |

### Акценты

| Токен | Значение | Где используется |
|-------|----------|-----------------|
| `--color-accent` | `#22c55e` | Кнопки, активные элементы, "Ready to craft!" |
| `--color-accent-hover` | `#16a34a` | Hover на зелёных кнопках |
| `--color-accent-bg` | `#14532d` | Фон активного таба навигации (тёмно-зелёный) |
| `--color-accent-subtle` | `rgba(34,197,94,0.1)` | Зелёная рамка craftable-карточек |
| `--color-gold` | `#f5c542` | Emerald 💎, Wandering Trader, валюта |
| `--color-gold-bg` | `rgba(245,197,66,0.1)` | Фон gold-элементов |

### Текст

| Токен | Значение | Где используется |
|-------|----------|-----------------|
| `--color-text` | `#f0f0f0` | Основной текст |
| `--color-text-muted` | `#6b7280` | Вторичный текст, подписи |
| `--color-text-danger` | `#ef4444` | Нехватка ингредиентов (красные числа в trade) |
| `--color-text-success` | `#22c55e` | "Ready to craft!", "Ready to Harvest!" |

---

## Типографика

| Токен | Значение |
|-------|----------|
| `--font-base` | `'Inter', -apple-system, sans-serif` |
| `--text-xs` | `11px` |
| `--text-sm` | `13px` |
| `--text-base` | `15px` |
| `--text-lg` | `18px` |
| `--text-xl` | `22px` |
| `--text-2xl` | `28px` |
| `--text-3xl` | `36px` |
| `--font-normal` | `400` |
| `--font-medium` | `500` |
| `--font-bold` | `700` |

---

## Отступы

| Токен | Значение |
|-------|----------|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |

---

## Радиусы и тени

| Токен | Значение | Где используется |
|-------|----------|-----------------|
| `--radius-sm` | `6px` | Кнопки, бейджи |
| `--radius-md` | `10px` | Карточки культур, строки сделок |
| `--radius-lg` | `14px` | Основные карточки (plots, recipe cards, villagers) |
| `--radius-xl` | `20px` | Модалки, крупные панели |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,0.5)` | Карточки |
| `--shadow-glow-green` | `0 0 12px rgba(34,197,94,0.3)` | Готовые грядки, craftable карточки |
| `--shadow-glow-gold` | `0 0 12px rgba(245,197,66,0.3)` | Wandering Trader |

---

## Компонентные токены

### Навигация (нижний бар)

```
Фон: --color-surface (#1a1a1a)
Активный таб: текст #22c55e, фон #14532d
Неактивный таб: текст #6b7280
Высота: 60px
```

### Карточка рецепта

```
Обычная: border 1px #2a2a2a
Craftable (Can Craft): border 1px #22c55e, box-shadow: --shadow-glow-green
Unknown: opacity 0.4, filter blur(2px) на контенте
```

### Карточка грядки (Plot)

```
Пустая: border 2px dashed #3a3a3a
Растёт: border 1px #2a2a2a, circular progress green
Готова: border 2px solid #22c55e, --shadow-glow-green, анимация pulse
Заперта: border 1px #2a2a2a, opacity 0.6
```

### Trade Row

```
Фон: --color-surface-2 (#252525)
Radius: --radius-md
Кнопка Trade активна: фон #22c55e, текст white
Кнопка Trade неактивна: фон #2a2a2a, текст #6b7280
Количество (не хватает): цвет --color-text-danger (#ef4444)
Количество (есть): цвет --color-text-muted
```

### Circular Progress (грядка)

```
Размер: 60px
Track: #2a2a2a
Fill: #22c55e
Анимация rotate 1 сек linear infinite (только пока растёт)
```

---

## Иконки и эмодзи

v0.dev использовал нативные emoji — придерживаемся этого подхода.
Нет необходимости в icon-библиотеке.

| Элемент | Emoji |
|---------|-------|
| Emerald (валюта) | 💎 |
| Wheat | 🌾 |
| Carrot | 🥕 |
| Potato | 🥔 |
| Pumpkin | 🎃 |
| Beetroot | 🫚 |
| Melon | 🍈 |
| Farmer | 👨‍🌾 |
| Butcher | 🥩 |
| Cleric | 🧪 |
| Wandering Trader | 🧳 |
| Bread | 🍞 |
| Cake | 🎂 |

---

## Источник

Референсы: `docs/design/Screenshot_1.png` — `Screenshot_5.png`
Инструмент: v0.dev (базовая версия без биллинга)
