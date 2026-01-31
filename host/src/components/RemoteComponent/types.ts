import { ComponentType } from 'react'

/**
 * Опции для создания lazy remote компонента
 */
export type TRemoteComponentOptions = {
  /**
   * Имя remote из конфигурации
   */
  remote: string

  /**
   * Путь к модулю в remote
   */
  module: string

  /**
   * Имя экспортируемого компонента (default или именованный экспорт)
   */
  exportName?: string

  /**
   * Компонент для отображения при ошибке загрузки
   */
  fallback?: ComponentType<{ error?: Error; retry?: () => void }>

  /**
   * Количество попыток загрузки
   */
  retries?: number

  /**
   * Таймаут загрузки в миллисекундах
   */
  timeout?: number
}
