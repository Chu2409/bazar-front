// import { useToast } from '@/shared/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLogin } from './use-auth-api'

const schema = z.object({
  dni: z
    .string()
    .regex(/^\d+$/, { message: 'Solo números' })
    .min(10, { message: 'Mínimo 9 caracteres' })
    .max(10, { message: 'Máximo 10 caracteres' }),
  password: z.string().min(6, { message: 'Mínimo 6 caracteres' }),
})

type FormFields = z.infer<typeof schema>

export const useAuthForm = () => {
  const router = useRouter()
  // const { toast } = useToast()
  const { isPending, mutateAsync } = useLogin()

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      dni: '',
      password: '',
    },
  })

  const onSubmit = async (values: FormFields) => {
    await mutateAsync(values)
    router.push('/dashboard')
  }

  return {
    form,
    isLoading: isPending,
    onSubmit,
    isPending,
  }
}
