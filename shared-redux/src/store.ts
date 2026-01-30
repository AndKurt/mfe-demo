import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

// ============ TYPES ============
export interface User {
  id: string
  name: string
  email: string
  isAuthenticated: boolean
}

export interface CounterState {
  value: number
  lastUpdatedBy?: string
}

// ============ INITIAL STATE ============
const initialState = {
  user: {
    id: '',
    name: 'Гость',
    email: '',
    isAuthenticated: false,
  } as User,
  counter: {
    value: 0,
  } as CounterState,
}

// ============ USER SLICE ============
const userSlice = createSlice({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    login: (state, action: PayloadAction<{ name: string; email: string }>) => {
      state.id = Date.now().toString()
      state.name = action.payload.name
      state.email = action.payload.email
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.id = ''
      state.name = 'Гость'
      state.email = ''
      state.isAuthenticated = false
    },
  },
})

// ============ COUNTER SLICE ============
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState.counter,
  reducers: {
    increment: (state, action: PayloadAction<{ by: number; module: string }>) => {
      state.value += action.payload.by
      state.lastUpdatedBy = action.payload.module
    },
    decrement: (state, action: PayloadAction<{ by: number; module: string }>) => {
      state.value -= action.payload.by
      state.lastUpdatedBy = action.payload.module
    },
    reset: (state, action: PayloadAction<string>) => {
      state.value = 0
      state.lastUpdatedBy = action.payload
    },
  },
})

// ============ NOTIFICATIONS SLICE ============
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [] as string[],
  reducers: {
    addNotification: (state, action: PayloadAction<string>) => {
      state.push(action.payload)
      if (state.length > 5) state.shift()
    },
    clearNotifications: (state) => {
      state.length = 0
    },
  },
})

// ============ STORE ============
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    counter: counterSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
})

// ============ EXPORT ACTIONS ============
export const { login, logout } = userSlice.actions
export const { increment, decrement, reset } = counterSlice.actions
export const { addNotification, clearNotifications } = notificationsSlice.actions

// ============ EXPORT TYPES ============
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
