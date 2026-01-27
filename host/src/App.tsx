import { Loading } from '@components'
import React, { Suspense, lazy } from 'react'

// Динамическая загрузка remote-компонентов
const LoginForm = lazy(() =>
  import('auth/LoginForm').then((module: any) => {
    // Пробуем все варианты
    const Component = module.LoginForm
    return { default: Component }
  })
)

export const App: React.FC = () => (
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
            <strong>Текущий пользователь:</strong>
          </p>
        </div>
        <div>
          <p>
            <strong>Значение счетчика:</strong>
          </p>
          <p>
            <small>Изменен: </small>
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
        </section>

        <section>
          <h2>Микрофронт: Дашборд</h2>
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
