import React from 'react'
import { SignInForm } from '../components/sign-in-form'

export const AuthView = () => {
  return (
    <div className='w-full flex h-full items-center justify-center bg-muted/50'>
      <SignInForm />
    </div>
  )
}
