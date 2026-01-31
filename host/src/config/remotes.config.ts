/**
 * Конфигурация удаленных микрофронтов для Runtime Module Federation
 *
 * Этот файл содержит URL и метаданные всех доступных remotes.
 * В production можно загружать этот конфиг с сервера или CDN.
 */

export interface ModuleInfo {
  path: string
  exportName: string
  description?: string
}
export interface RemoteConfig {
  name: string
  url: string
  scope: string
  /**
   * Указанное поле не используется НИГДЕ
   * Это просто для информации о доступных модулях из предоставляемого скоупа
   */
  modules: ModuleInfo[]
  description?: string
}

export interface RemotesConfig {
  [key: string]: RemoteConfig
}

/**
 * Конфигурация доступных микрофронтов
 * В production эти данные можно получать из API или переменных окружения
 */
export const REMOTES_CONFIG: RemotesConfig = {
  // Микрофронт авторизации
  auth: {
    name: 'auth',
    url: process.env.AUTH_URL || 'http://localhost:3002/remoteEntry.js',
    scope: 'auth',
    modules: [
      {
        path: './LoginForm',
        exportName: 'LoginForm',
        description: 'Форма входа в систему',
      },
      {
        path: './UserProfile',
        exportName: 'UserProfile',
        description: 'Профиль пользователя с информацией об учетной записи',
      },
    ],
    description: 'Микрофронт авторизации',
  },

  // Микрофронт дашборда
  dashboard: {
    name: 'dashboard',
    url: process.env.DASHBOARD_URL || 'http://localhost:3003/remoteEntry.js',
    scope: 'dashboard',
    modules: [
      {
        path: './Counter',
        exportName: 'Counter',
        description: 'Счетчик',
      },
      {
        path: './Notifications',
        exportName: 'Notifications',
        description: 'Список уведомлений',
      },
    ],
    description: 'Микрофронт дашборда',
  },
}

/**
 * Получить конфигурацию remote по имени
 */
export const getRemoteConfig = (remoteName: string): RemoteConfig | null => {
  return REMOTES_CONFIG[remoteName] || null
}

/**
 * Получить все доступные remotes
 */
export const getAllRemotes = (): RemotesConfig => {
  return REMOTES_CONFIG
}

/**
 * В production можно загружать конфигурацию динамически:
 *
 * export const fetchRemotesConfig = async (): Promise<RemotesConfig> => {
 *   const response = await fetch('/api/microfrontends/config')
 *   return response.json()
 * }
 */
