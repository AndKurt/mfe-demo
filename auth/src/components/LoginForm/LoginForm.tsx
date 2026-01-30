import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, addNotification, RootState, reset } from 'shared-redux'

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const handleLogin = () => {
    if (email && name) {
      dispatch(login({ email, name }))
      dispatch(reset(name))
      dispatch(addNotification(`Пользователь ${name} вошел в систему`))
    }
  }

  if (user.isAuthenticated) {
    return (
      <div style={{ padding: '20px', border: '2px solid #4CAF50', borderRadius: '8px' }}>
        <h3>Вы уже авторизованы</h3>
        <p>Используйте компонент "Профиль пользователя" для выхода</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', border: '2px solid #2196F3', borderRadius: '8px' }}>
      <h3>Авторизация</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type='text'
          placeholder='Имя'
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginRight: '10px', padding: '5px' }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          backgroundColor: '#2196F3',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>
        Войти
      </button>
    </div>
  )
}
