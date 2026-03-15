import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import RecipesApp from './remotes/RecipesApp'

function Placeholder({ name }: { name: string }) {
  return <div style={{ padding: 24, color: '#888' }}>{name} — coming soon</div>
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
      <Routes>
        <Route path="/craft/table" element={<Placeholder name="Crafting Table" />} />
        <Route path="/craft/farm" element={<Placeholder name="Farm" />} />
        <Route path="/craft" element={<Placeholder name="Craft" />} />
        <Route path="/trade" element={<Placeholder name="Village Market" />} />
        <Route path="/recipes/*" element={<RecipesApp />} />
        <Route path="*" element={<RecipesApp />} />
      </Routes>
      </main>
    </BrowserRouter>
  )
}
