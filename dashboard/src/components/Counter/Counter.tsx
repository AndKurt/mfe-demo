import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, reset, addNotification, RootState } from 'shared-redux'

export const Counter: React.FC = () => {
  const dispatch = useDispatch()
  const counter = useSelector((state: RootState) => state.counter)
  const user = useSelector((state: RootState) => state.user)

  const handleIncrement = () => {
    dispatch(increment({ by: 1, module: 'mfe_dashboard/Counter' }))
    dispatch(addNotification('Счетчик увеличен (отправитель Dashboard)'))
  }

  const handleDecrement = () => {
    dispatch(decrement({ by: 1, module: 'mfe_dashboard/Counter' }))
    dispatch(addNotification('Счетчик уменьшен (отправитель Dashboard)'))
  }

  const handleReset = () => {
    dispatch(reset('mfe_dashboard/Counter'))
    dispatch(addNotification('Счетчик сброшен (отправитель Dashboard)'))
  }

  return (
    <div style={{ padding: '20px', border: '2px solid #FF5722', borderRadius: '8px' }}>
      <h3>Dashboard: Счетчик</h3>
      <div style={{ marginBottom: '15px' }}>
        <p>
          <strong>Текущее значение:</strong> {counter.value}
        </p>
        <p>
          <strong>Пользователь:</strong> {user.name}
        </p>
        <p>
          <strong>Последнее изменение:</strong> {counter.lastUpdatedBy || 'нет'}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <button
          onClick={handleDecrement}
          style={{
            backgroundColor: '#FF9800',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
          -1
        </button>
        <button
          onClick={handleIncrement}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
          +1
        </button>
        <button
          onClick={handleReset}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
          Сбросить
        </button>
      </div>
      <div style={{ padding: '10px', backgroundColor: '#e8f5e8' }}>
        <p>
          <small>Этот компонент работает с общим состоянием Redux, которое доступно всем микрофронтам</small>
        </p>
      </div>
    </div>
  )
}
