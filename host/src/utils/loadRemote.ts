/**
 * Runtime загрузчик для Module Federation
 *
 * Этот модуль обеспечивает динамическую загрузку remote-модулей
 * с полной обработкой ошибок, retry-логикой и кэшированием.
 */

import { getRemoteConfig } from '../config/remotes.config'

// Типы для Module Federation
declare global {
  interface Window {
    [key: string]: any
  }
}

export interface ILoadRemoteOptions {
  retries?: number
  timeout?: number
  bustCache?: boolean
}

// Кэш загруженных remotes для избежания повторных запросов
const remoteCache = new Map<string, any>()

// Кэш загруженных скриптов
const scriptCache = new Map<string, Promise<void>>()

/**
 * Загружает скрипт remote-модуля
 *
 * @param url - URL remoteEntry.js
 * @param scope - Имя scope (название remote)
 * @param bustCache - Принудительно обновить кэш
 */
export const loadScript = (url: string, scope: string, bustCache = false): Promise<void> => {
  // Используем кэш если скрипт уже загружается
  const cacheKey = `${scope}@${url}`

  if (!bustCache && scriptCache.has(cacheKey)) {
    return scriptCache.get(cacheKey)!
  }

  const promise = new Promise<void>((resolve, reject) => {
    // Проверяем, не загружен ли уже scope
    if (!bustCache && window[scope]) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = bustCache ? `${url}?t=${Date.now()}` : url
    script.type = 'text/javascript'
    script.async = true

    script.onload = () => {
      console.log(`✅ Remote script loaded: ${scope} from ${url}`)
      resolve()
    }

    script.onerror = (error) => {
      console.error(`❌ Failed to load remote script: ${scope} from ${url}`, error)
      // Удаляем из кэша при ошибке
      scriptCache.delete(cacheKey)
      reject(new Error(`Failed to load remote entry: ${url}`))
    }

    document.head.appendChild(script)
  })

  scriptCache.set(cacheKey, promise)
  return promise
}

/**
 * Инициализирует sharing scope для Module Federation
 * Это необходимо для корректной работы shared зависимостей
 */
const initSharing = async (): Promise<void> => {
  // @ts-ignore - __webpack_init_sharing__ добавляется Webpack
  if (!__webpack_init_sharing__) {
    console.warn('⚠️ __webpack_init_sharing__ is not available')
    return
  }

  // @ts-ignore
  await __webpack_init_sharing__('default')
}

/**
 * Инициализирует remote container
 *
 * @param scope - Имя remote scope
 */
const initContainer = async (scope: string): Promise<any> => {
  if (!window[scope]) {
    throw new Error(`Remote container "${scope}" not found on window`)
  }

  const container = window[scope]

  // Проверяем, не инициализирован ли уже container
  if (container.__initialized) {
    return container
  }

  // @ts-ignore - __webpack_share_scopes__ добавляется Webpack
  if (!__webpack_share_scopes__) {
    throw new Error('__webpack_share_scopes__ is not available')
  }

  // Инициализируем container с shared scope
  // @ts-ignore
  await container.init(__webpack_share_scopes__.default)

  // Помечаем как инициализированный
  container.__initialized = true

  console.log(`🔧 Remote container initialized: ${scope}`)

  return container
}

/**
 * Основная функция загрузки remote-модуля
 *
 * @param remoteName - Имя remote из конфигурации (например, 'auth')
 * @param moduleName - Имя модуля для загрузки (например, './LoginForm')
 * @param options - Опции загрузки
 *
 * @example
 * const LoginForm = await loadRemote('auth', './LoginForm')
 */
export const loadRemote = async <T = any>(
  remoteName: string,
  moduleName: string,
  options: ILoadRemoteOptions = {}
): Promise<T> => {
  const { retries = 3, timeout = 10000, bustCache = false } = options

  const cacheKey = `${remoteName}/${moduleName}`

  // Проверяем кэш
  if (!bustCache && remoteCache.has(cacheKey)) {
    console.log(`📦 Loading from cache: ${cacheKey}`)
    return remoteCache.get(cacheKey)
  }

  // Получаем конфигурацию remote
  const config = getRemoteConfig(remoteName)
  if (!config) {
    throw new Error(`Remote "${remoteName}" not found in configuration`)
  }

  let lastError: Error | null = null

  // Retry логика
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`🔄 Loading remote [attempt ${attempt}/${retries}]: ${remoteName}/${moduleName}`)

      // Таймаут для всей операции загрузки
      const loadPromise = (async () => {
        // 1. Инициализируем sharing
        await initSharing()

        // 2. Загружаем скрипт remote
        await loadScript(config.url, config.scope, bustCache && attempt > 1)

        // 3. Инициализируем container
        const container = await initContainer(config.scope)

        // 4. Получаем factory для модуля
        const factory = await container.get(moduleName)

        // 5. Вызываем factory для получения модуля
        const module = factory()

        return module
      })()

      // Применяем timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Load timeout')), timeout)
      })

      const module = (await Promise.race([loadPromise, timeoutPromise])) as T

      // Сохраняем в кэш
      remoteCache.set(cacheKey, module)

      console.log(`✅ Remote loaded successfully: ${cacheKey}`)

      return module
    } catch (error) {
      lastError = error as Error
      console.error(`❌ Attempt ${attempt} failed:`, error)

      // Если это не последняя попытка, ждем перед повтором
      if (attempt < retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000) // Exponential backoff
        console.log(`⏳ Retrying in ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  // Все попытки провалились
  throw new Error(
    `Failed to load remote "${remoteName}/${moduleName}" after ${retries} attempts. Last error: ${lastError?.message}`
  )
}

/**
 * Очищает кэш для конкретного remote или всех remotes
 *
 * @param remoteName - Имя remote для очистки (опционально)
 */
export const clearRemoteCache = (remoteName?: string): void => {
  if (remoteName) {
    // Очищаем кэш для конкретного remote
    for (const key of remoteCache.keys()) {
      if (key.startsWith(remoteName + '/')) {
        remoteCache.delete(key)
      }
    }
    console.log(`🗑️ Cache cleared for remote: ${remoteName}`)
  } else {
    // Очищаем весь кэш
    remoteCache.clear()
    console.log('🗑️ All remote cache cleared')
  }
}
