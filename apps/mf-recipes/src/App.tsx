import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CatalogPage from './pages/CatalogPage'
import RecipeDetailPage from './pages/RecipeDetailPage'

export default function App() {
  const inShell = typeof window !== 'undefined' && !!(window as any).__fridgecraft
  // В shell родитель передаёт "остаток" пути: "" для /, "bread" для /recipes/bread
  const content = inShell ? (
    <Routes>
      <Route index element={<CatalogPage />} />
      <Route path=":id" element={<RecipeDetailPage />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
      <Route
        path="/craft/table"
        element={<div style={{ padding: 24, color: '#888' }}>Crafting Table — open from shell</div>}
      />
      <Route
        path="/trade"
        element={<div style={{ padding: 24, color: '#888' }}>Village Market — open from shell</div>}
      />
    </Routes>
  )
  return inShell ? content : <BrowserRouter>{content}</BrowserRouter>
}
