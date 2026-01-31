import { ILoadRemoteOptions, loadRemote } from './loadRemote'

/**
 * Загружает несколько remote-модулей параллельно
 *
 * @example
 * const [LoginForm, Counter] = await loadRemotes([
 *   { remote: 'auth', module: './LoginForm' },
 *   { remote: 'dashboard', module: './Counter' }
 * ])
 */
export const loadRemotes = async <T = any>(
  modules: Array<{ remote: string; module: string; options?: ILoadRemoteOptions }>
): Promise<T[]> => {
  const promises = modules.map(({ remote, module, options }) => loadRemote<T>(remote, module, options))

  return Promise.all(promises)
}
