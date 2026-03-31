import { Link, NavLink } from 'react-router-dom'
import { useInventoryStore } from '../../store/inventoryStore'
import './Header.css'

const MOCK_EMERALD = 1

export default function Header() {
  const { inventory } = useInventoryStore()
  const topItems = Object.entries(inventory)
    .slice(0, 4)
    .map(([item, count]) => ({ item, count }))
  const restCount = Object.keys(inventory).length - 4

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        ⚒️ FridgeCraft
      </Link>

      <nav className="header__nav">
        <NavLink to="/" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`} end>
          Recipe Book
        </NavLink>
        <NavLink to="/craft/farm" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`}>
          Farm
        </NavLink>
        <NavLink to="/trade" className={({ isActive }) => `header__nav-link ${isActive ? 'active' : ''}`}>
          Trade
        </NavLink>
      </nav>

      <div className="header__inventory">
        {topItems.map(({ item, count }) => (
          <span key={item} className="header__inv-item">
            {item} ×{count}
          </span>
        ))}
        {restCount > 0 && <span className="header__inv-more">... {restCount} more</span>}
        <span className="header__emerald">💎 {MOCK_EMERALD}</span>
      </div>
    </header>
  )
}
