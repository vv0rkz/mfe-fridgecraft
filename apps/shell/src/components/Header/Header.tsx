import { Link, NavLink } from 'react-router-dom'
import './Header.css'

// TODO: подключить useInventoryStore — inventory, emerald
// TODO: слушать fridgecraft:inventory-updated → обновлять отображение
const MOCK_INVENTORY: Record<string, number> = {
  wheat: 5,
  potato: 2,
}
const MOCK_EMERALD = 1

export default function Header() {
  const topItems = Object.entries(MOCK_INVENTORY)
    .slice(0, 4)
    .map(([item, count]) => ({ item, count }))
  const restCount = Object.keys(MOCK_INVENTORY).length - 4

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        ⚒️ FridgeCraft
      </Link>

      <nav className="header__nav">
        <NavLink to="/" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`} end>Recipe Book</NavLink>
        <NavLink to="/craft/farm" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`}>Farm</NavLink>
        <NavLink to="/trade" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`}>Trade</NavLink>
      </nav>

      <div className="header__inventory">
        {topItems.map(({ item, count }) => (
          <span key={item} className="header__inv-item">
            {item} ×{count}
          </span>
        ))}
        {restCount > 0 && (
          <span className="header__inv-more">... {restCount} more</span>
        )}
        <span className="header__emerald">💎 {MOCK_EMERALD}</span>
      </div>
    </header>
  )
}
