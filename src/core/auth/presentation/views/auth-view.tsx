import React from 'react'
import { LoginForm } from '../components/login-form'

export const AuthView = () => {
  return (
    <div className='w-full flex h-full items-center justify-center bg-muted/50'>
      <LoginForm />
    </div>
  )
}
