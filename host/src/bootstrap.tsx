import { createRoot } from 'react-dom/client'
import { App } from './App'

export const container = document.getElementById('root-host')

if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
