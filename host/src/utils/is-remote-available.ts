import { getRemoteConfig } from '@config/remotes.config'
import { loadScript } from './loadRemote'

/**
 * Проверяет доступность remote
 *
 * @param remoteName - Имя remote для проверки
 * @returns true если remote доступен
 */
export const isRemoteAvailable = async (remoteName: string): Promise<boolean> => {
  const config = getRemoteConfig(remoteName)
  if (!config) return false

  try {
    await loadScript(config.url, config.scope)
    return window[config.scope] !== undefined
  } catch {
    return false
  }
}
