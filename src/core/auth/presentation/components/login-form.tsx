'use client'

import { Button } from '@/ui-components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/ui-components/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/ui-components/form'
import { Input } from '@/ui-components/input'
import { LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuthForm } from '../../hooks/use-auth-form'

export const LoginForm = () => {
  const router = useRouter()
  const { form, isLoading, onSubmit } = useAuthForm()

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/inventory')
  }, [router])

  return (
    <Card className='w-full max-w-md mx-2 drop-shadow-2xl'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=''>
          <CardHeader>
            <CardTitle className='text-2xl'>Login</CardTitle>
            <CardDescription>
              Ingresa tu cédula y contraseña para acceder al sistema
            </CardDescription>
          </CardHeader>

          <CardContent className='grid gap-4'>
            <FormField
              control={form.control}
              name='dni'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula</FormLabel>
                  <FormControl>
                    <Input placeholder='1442121323' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='**********'
                      type='password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter>
            <Button
              disabled={isLoading}
              type='submit'
              className='w-full gap-x-2'
            >
              Ingresar
              <LogIn className='w-4 h-4' />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
