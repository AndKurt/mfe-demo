import React, { ComponentType } from 'react'
import { loadRemote } from '@utils'
import { TRemoteComponentOptions } from '../components/RemoteComponent/types'

/**
 * Хук для runtime загрузки remote компонента с состоянием загрузки
 *
 * @example
 * const { Component, loading, error, reload } = useRemoteComponent({
 *   remote: 'auth',
 *   module: './LoginForm',
 *   exportName: 'LoginForm'
 * })
 *
 * if (loading) return <Loading />
 * if (error) return <Error error={error} retry={reload} />
 * return <Component />
 */
export const useRemoteComponent = <P extends object = {}>({
  remote,
  module,
  exportName = 'default',
  retries = 3,
  timeout = 10000,
}: TRemoteComponentOptions) => {
  const [component, setComponent] = React.useState<ComponentType<P> | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)
  const [reloadTrigger, setReloadTrigger] = React.useState(0)

  React.useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        setLoading(true)
        setError(null)

        const remoteModule = await loadRemote(remote, module, {
          retries,
          timeout,
          bustCache: reloadTrigger > 0, // Обновляем кэш при перезагрузке
        })

        if (!mounted) return

        const Component = exportName === 'default' ? remoteModule.default || remoteModule : remoteModule[exportName]

        if (!Component) {
          throw new Error(`Component "${exportName}" not found in ${remote}/${module}`)
        }

        setComponent(() => Component)
      } catch (err) {
        if (!mounted) return
        setError(err as Error)
        console.error('Failed to load remote component:', err)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [remote, module, exportName, retries, timeout, reloadTrigger])

  const reload = React.useCallback(() => {
    setReloadTrigger((prev) => prev + 1)
  }, [])

  return {
    Component: component,
    loading,
    error,
    reload,
  }
}
