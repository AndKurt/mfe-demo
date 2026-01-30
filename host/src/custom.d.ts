declare module 'auth/*' {
  const Component: React.ComponentType<any>
  export default Component
}

// TODO Разобраться с пропсами
declare module 'auth/LoginForm' {
  const LoginForm: React.ComponentType<{
    onSubmit?: (data: any) => void
    className?: string
  }>

  export default LoginForm
}

declare module 'auth/UserProfile' {
  const UserProfile: React.ComponentType<{}>

  export default UserProfile
}

declare module 'dashboard/*' {
  const Component: React.ComponentType<any>
  export default Component
}

declare module 'dashboard/Counter' {
  const Counter: React.ComponentType<{}>

  export default Counter
}

declare module 'dashboard/Notifications' {
  const Notifications: React.ComponentType<{}>

  export default Notifications
}
