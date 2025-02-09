'use client'

import { Button } from '@/ui-components/button'
import { LogIn } from 'lucide-react'
import { useAuthForm } from '../../hooks/use-auth-form'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'

export const SignInForm = () => {
  const { form, isPending, onSubmit } = useAuthForm()

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-6'>
        <RHFInput name='username' label='Usuario' placeholder='Chu2409' />

        <RHFInput
          name='password'
          label='Contraseña'
          type='password'
          placeholder='********'
        />

        <Button disabled={isPending} type='submit' className='w-full gap-x-2'>
          Ingresar
          <LogIn className='w-4 h-4' />
        </Button>
      </form>
    </FormProvider>
  )
}
