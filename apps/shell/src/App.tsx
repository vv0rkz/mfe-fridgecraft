import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RecipesApp from './remotes/RecipesApp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecipesApp />} />
      </Routes>
    </BrowserRouter>
  )
}
