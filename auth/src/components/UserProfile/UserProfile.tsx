import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, addNotification, RootState, reset } from 'shared-redux'

export const UserProfile: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const counter = useSelector((state: RootState) => state.counter)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset('mfe_auth/UserProfile'))
    dispatch(addNotification(`Пользователь ${user.name} вышел из системы`))
  }

  if (!user.isAuthenticated) {
    return (
      <div style={{ padding: '20px', border: '2px solid #2196F3', borderRadius: '8px' }}>
        <h3>Профиль пользователя</h3>
        <p>Для просмотра профиля необходимо войти в систему</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', border: '2px solid #4CAF50', borderRadius: '8px' }}>
      <h3>Профиль пользователя</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>
          <strong>Имя:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>ID:</strong> {user.id}
        </p>
      </div>
      <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#f5f5f5' }}>
        <p>
          <strong>Информация о счетчике:</strong>
        </p>
        <p>Текущее значение: {counter.value}</p>
        <p>Последнее изменение: {counter.lastUpdatedBy || 'нет'}</p>
      </div>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
        Выйти
      </button>
    </div>
  )
}
