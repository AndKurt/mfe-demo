import { ComponentType, lazy, LazyExoticComponent, FC, useState, useEffect } from 'react'
import { loadRemote } from '../../utils/loadRemote'
import { TRemoteComponentOptions } from './types'
import { DefaultErrorFallback } from '@components/DefaultErrorFallback'

/**
 * Создает lazy React компонент для runtime загрузки remote модуля
 *
 * @example
 * const LoginForm = createRemoteComponent({
 *   remote: 'auth',
 *   module: './LoginForm',
 *   exportName: 'LoginForm'
 * })
 *
 * // Использование в JSX
 * <Suspense fallback={<Loading />}>
 *   <LoginForm />
 * </Suspense>
 */
export const createRemoteComponent = <P extends object = {}>({
  remote,
  module,
  exportName = 'default',
  fallback,
  retries = 3,
  timeout = 10000,
}: TRemoteComponentOptions): LazyExoticComponent<ComponentType<P>> => {
  return lazy(async () => {
    try {
      console.log(`🎯 Creating remote component: ${remote}/${module}`)

      // Загружаем remote модуль
      const remoteModule = await loadRemote(remote, module, {
        retries,
        timeout,
      })

      // Получаем компонент из модуля
      let Component: ComponentType<P>

      if (exportName === 'default') {
        Component = remoteModule.default || remoteModule
      } else {
        Component = remoteModule[exportName]
      }

      if (!Component) {
        throw new Error(`Component "${exportName}" not found in ${remote}/${module}`)
      }

      // Если указан fallback, оборачиваем компонент в обработчик ошибок
      if (fallback) {
        const WrappedComponent: FC<P> = (props) => {
          const [hasError, setHasError] = useState(false)
          const [error, setError] = useState<Error>()

          useEffect(() => {
            // Сбрасываем ошибку при изменении props
            setHasError(false)
            setError(undefined)
          }, [props])

          if (hasError) {
            const FallbackComponent = fallback
            return (
              <FallbackComponent
                error={error}
                retry={() => {
                  setHasError(false)
                  setError(undefined)
                }}
              />
            )
          }

          try {
            return <Component {...props} />
          } catch (err) {
            setHasError(true)
            setError(err as Error)
            return null
          }
        }

        return { default: WrappedComponent }
      }

      return { default: Component }
    } catch (error) {
      console.error(`Failed to load remote component ${remote}/${module}:`, error)

      // Возвращаем компонент с ошибкой
      const ErrorComponent: FC<P> = () => {
        const FallbackComponent = fallback || DefaultErrorFallback

        return (
          <FallbackComponent
            error={error as Error}
            retry={() => window.location.reload()}
            remote={remote}
            module={module}
          />
        )
      }

      return { default: ErrorComponent }
    }
  })
}
