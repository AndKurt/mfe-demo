import { createRoot } from 'react-dom/client'
import { LoginForm } from '@components'

import { Provider } from 'react-redux'
import { store } from 'shared-redux'

const container = document.getElementById('root-auth')

if (container) {
  const root = createRoot(container)
  root.render(
    <Provider store={store}>
      <LoginForm />
    </Provider>
  )
}
