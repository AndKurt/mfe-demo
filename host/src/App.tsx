import React, { Suspense, lazy } from 'react'
import { Loading } from '@components'
import { useSelector } from 'react-redux'
import { RootState } from 'shared-redux'

// Динамическая загрузка remote-компонентов
const LoginForm = lazy(() =>
  import('auth/LoginForm')
    .then((module: any) => {
      const Component = module.LoginForm
      return { default: Component }
    })
    .catch((error) => {
      console.error('Failed to load module:', error)
      return { default: () => <div>Module failed to load: LoginForm</div> }
    })
)

const UserProfile = lazy(() =>
  import('auth/UserProfile')
    .then((module: any) => {
      const Component = module.UserProfile
      return { default: Component }
    })
    .catch((error) => {
      console.error('Failed to load module:', error)
      return { default: () => <div>Module failed to load: UserProfile</div> }
    })
)

const Counter = lazy(() =>
  import('dashboard/Counter')
    .then((module: any) => {
      const Component = module.Counter
      return { default: Component }
    })
    .catch((error) => {
      console.error('Failed to load module:', error)
      return { default: () => <div>Module failed to load: Counter</div> }
    })
)

const Notifications = lazy(() =>
  import('dashboard/Notifications')
    .then((module: any) => {
      const Component = module.Notifications
      return { default: Component }
    })
    .catch((error) => {
      console.error('Failed to load module:', error)
      return { default: () => <div>Module failed to load: Notifications</div> }
    })
)

export const App: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)
  const counter = useSelector((state: RootState) => state.counter)

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1>Хост-приложение</h1>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px',
            backgroundColor: '#f0f0f0',
            borderRadius: '8px',
          }}>
          <div>
            <p>
              <strong>Текущий пользователь: </strong>
              {user.name} {user.isAuthenticated ? '✅' : '❌'}
            </p>
          </div>
          <div>
            <p>
              <strong>Значение счетчика:</strong> {counter.value}
            </p>
            <p>
              <small>Изменен: {user.name || '-'}</small>
            </p>
          </div>
        </div>
      </header>

      <main>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <section>
            <h2>Микрофронт: Авторизация</h2>
            <div style={{ marginBottom: '20px' }}>
              <Suspense fallback={<Loading />}>
                <LoginForm />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<Loading />}>
                <UserProfile />
              </Suspense>
            </div>
          </section>

          <section>
            <h2>Микрофронт: Дашборд</h2>
            <div style={{ marginBottom: '20px' }}>
              <Suspense fallback={<Loading />}>
                <Counter />
              </Suspense>
            </div>
            <div>
              <Suspense fallback={<Loading />}>
                <Notifications />
              </Suspense>
            </div>
          </section>
        </div>

        <div
          style={{
            padding: '20px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            border: '1px solid #2196F3',
          }}>
          <h3>Реализация общего state</h3>
          <p>Все компоненты работают с одним Redux. Изменения в одном микрофронте мгновенно отображаются в других:</p>
          <ul>
            <li>Авторизация в LoginForm - обновляется UserProfile</li>
            <li>Изменение счетчика - обновляется во всех компонентах</li>
            <li>Уведомления добавляются из всех микрофронтов</li>
          </ul>
        </div>
      </main>

      <footer style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid #ccc' }}>
        <p>
          <strong>Архитектура:</strong> Host + 2 Remote (MFE) + Shared Redux Store
        </p>
        <p>
          <strong>Build-time связывание:</strong> Хост знает о микрофронтах на этапе сборки (remotes в webpack config)
        </p>
      </footer>
    </div>
  )
}
