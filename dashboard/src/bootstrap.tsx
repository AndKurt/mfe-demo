import { createRoot } from 'react-dom/client'
import { Counter, Notifications } from '@components'

import { Provider } from 'react-redux'
import { store } from 'shared-redux'

const container = document.getElementById('root-dashboard')

if (container) {
  const root = createRoot(container)
  root.render(
    <Provider store={store}>
      <Counter />
      <Notifications />
    </Provider>
  )
}
