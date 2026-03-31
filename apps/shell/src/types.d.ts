import type { useInventoryStore } from './store/inventoryStore'

declare module 'recipes/App' {
  import { ComponentType } from 'react'
  const App: ComponentType
  export default App
}

declare global {
  interface Window {
    __fridgecraft: {
      useInventoryStore: typeof useInventoryStore
    }
  }

  interface WindowEventMap {
    'fridgecraft:inventory-updated': CustomEvent<{ inventory: Record<string, number> }>
  }
}
