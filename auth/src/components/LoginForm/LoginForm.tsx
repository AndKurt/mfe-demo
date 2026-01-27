import React, { useState } from 'react'

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

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
        onClick={() => {
          console.log('клик войти')
        }}
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
