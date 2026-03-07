import { lazy, Suspense } from 'react'

const RemoteApp = lazy(() => import('recipes/App'))

export default function RecipesApp() {
  return (
    <Suspense fallback={<div>Loading Recipes...</div>}>
      <RemoteApp />
    </Suspense>
  )
}
