'use strict'
var _a, _b, _c
Object.defineProperty(exports, '__esModule', { value: true })
exports.clearNotifications =
  exports.addNotification =
  exports.reset =
  exports.decrement =
  exports.increment =
  exports.logout =
  exports.login =
  exports.store =
    void 0
var toolkit_1 = require('@reduxjs/toolkit')
// ============ INITIAL STATE ============
var initialState = {
  user: {
    id: '',
    name: 'Гость',
    email: '',
    isAuthenticated: false,
  },
  counter: {
    value: 0,
  },
}
// ============ USER SLICE ============
var userSlice = (0, toolkit_1.createSlice)({
  name: 'user',
  initialState: initialState.user,
  reducers: {
    login: function (state, action) {
      state.id = Date.now().toString()
      state.name = action.payload.name
      state.email = action.payload.email
      state.isAuthenticated = true
    },
    logout: function (state) {
      state.id = ''
      state.name = 'Гость'
      state.email = ''
      state.isAuthenticated = false
      ;(0, exports.reset)('-')
    },
  },
})
// ============ COUNTER SLICE ============
var counterSlice = (0, toolkit_1.createSlice)({
  name: 'counter',
  initialState: initialState.counter,
  reducers: {
    increment: function (state, action) {
      state.value += action.payload.by
      state.lastUpdatedBy = action.payload.module
    },
    decrement: function (state, action) {
      state.value -= action.payload.by
      state.lastUpdatedBy = action.payload.module
    },
    reset: function (state, action) {
      state.value = 0
      state.lastUpdatedBy = action.payload
    },
  },
})
// ============ NOTIFICATIONS SLICE ============
var notificationsSlice = (0, toolkit_1.createSlice)({
  name: 'notifications',
  initialState: [],
  reducers: {
    addNotification: function (state, action) {
      state.push(action.payload)
      if (state.length > 5) state.shift()
    },
    clearNotifications: function (state) {
      state.length = 0
    },
  },
})
// ============ STORE ============
exports.store = (0, toolkit_1.configureStore)({
  reducer: {
    user: userSlice.reducer,
    counter: counterSlice.reducer,
    notifications: notificationsSlice.reducer,
  },
  middleware: function (getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
  },
})
// ============ EXPORT ACTIONS ============
;(exports.login = ((_a = userSlice.actions), _a.login)), (exports.logout = _a.logout)
;(exports.increment = ((_b = counterSlice.actions), _b.increment)),
  (exports.decrement = _b.decrement),
  (exports.reset = _b.reset)
;(exports.addNotification = ((_c = notificationsSlice.actions), _c.addNotification)),
  (exports.clearNotifications = _c.clearNotifications)
