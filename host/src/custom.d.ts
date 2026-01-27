declare module 'auth/LoginForm' {
  const LoginForm: React.ComponentType<{
    onSubmit?: (data: any) => void
    className?: string
  }>

  export default LoginForm
}

declare module 'auth/*' {
  const Component: React.ComponentType<any>
  export default Component
}
