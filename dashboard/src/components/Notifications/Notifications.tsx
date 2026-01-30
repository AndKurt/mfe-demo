import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearNotifications, RootState } from 'shared-redux'

export const Notifications: React.FC = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state: RootState) => state.notifications)

  return (
    <div style={{ padding: '20px', border: '2px solid #FF5722', borderRadius: '8px' }}>
      <h3>Dashboard: Уведомления</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <p>
          <strong>История событий ({notifications.length})</strong>
        </p>
        {notifications.length > 0 && (
          <button
            onClick={() => dispatch(clearNotifications())}
            style={{
              backgroundColor: '#757575',
              color: 'white',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
            Очистить
          </button>
        )}
      </div>
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {notifications.length === 0 ? (
          <p style={{ color: '#666' }}>Нет уведомлений</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {notifications.map((note, index) => (
              <li
                key={index}
                style={{
                  padding: '8px',
                  marginBottom: '5px',
                  backgroundColor: index === notifications.length - 1 ? '#fff3e0' : '#f5f5f5',
                  borderLeft: '4px solid #FF9800',
                }}>
                {note}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div style={{ marginTop: '10px', fontSize: '0.8em', color: '#666' }}>
        <p>Уведомления добавляются из разных микрофронтов и хранятся в общем состоянии</p>
      </div>
    </div>
  )
}
