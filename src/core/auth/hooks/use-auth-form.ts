import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useSignIn } from './use-auth-service'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const schema = z.object({
  username: z
    .string({ message: 'Ingresa tu usuario' })
    .min(5, { message: 'Mínimo 6 caracteres' }),
  password: z
    .string({
      message: 'Ingresa tu contraseña',
    })
    .min(5, { message: 'Mínimo 5 caracteres' }),
})

type FormFields = z.infer<typeof schema>

export const useAuthForm = () => {
  const router = useRouter()
  const { isPending, mutateAsync } = useSignIn()

  useEffect(() => {
    router.prefetch('/products')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormFields) => await mutateAsync(values)

  return {
    form,
    isPending,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
