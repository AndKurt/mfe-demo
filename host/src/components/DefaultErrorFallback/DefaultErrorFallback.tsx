import { FC } from 'react'

/**
 * Дефолтный компонент для отображения ошибок
 */
export const DefaultErrorFallback: FC<{
  error?: Error
  retry?: () => void
  remote?: string
  module?: string
}> = ({ error, retry, remote, module }) => (
  <div
    style={{
      padding: '20px',
      border: '2px solid #ff4444',
      borderRadius: '8px',
      backgroundColor: '#fff5f5',
      margin: '10px 0',
    }}>
    <h3 style={{ margin: '0 0 10px 0', color: '#cc0000' }}>❌ Ошибка загрузки микрофронта</h3>
    {remote && module && (
      <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
        <strong>Remote:</strong> {remote} <br />
        <strong>Module:</strong> {module}
      </p>
    )}
    {error && (
      <details style={{ marginTop: '10px' }}>
        <summary style={{ cursor: 'pointer', color: '#666' }}>Детали ошибки</summary>
        <pre
          style={{
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '12px',
            overflow: 'auto',
          }}>
          {error.message}
          {error.stack && `\n\n${error.stack}`}
        </pre>
      </details>
    )}
    {retry && (
      <button
        onClick={retry}
        style={{
          marginTop: '15px',
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}>
        🔄 Попробовать снова
      </button>
    )}
  </div>
)
