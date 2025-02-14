import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCreateProduct } from './use-products-service'

const schema = z.object({
  barcode: z.string().optional(),
  name: z.string({ message: 'Ingresa el nombre del producto' }).min(5, {
    message: 'Mínimo 5 caracteres',
  }),
  description: z.string().min(5, { message: 'Mínimo 5 caracteres' }).optional(),
  retailPrice: z.number({ message: 'Ingresa el precio de venta' }).min(0, {
    message: 'Mínimo 0',
  }),
  wholesalePrice: z.number({ message: 'Ingresa el precio de mayoreo' }).min(0, {
    message: 'Mínimo 0',
  }),
  wholesaleQty: z.number({ message: 'Ingresa la cantidad de mayoreo' }).min(0, {
    message: 'Mínimo 0',
  }),
  minStock: z
    .number({ message: 'Ingresa la cantidad mínima en stock' })
    .min(0, {
      message: 'Mínimo 0',
    }),
  image: z.string().optional(),
  active: z.boolean().default(true),
  categoryId: z.number({ message: 'Selecciona una categoría' }).min(1, {
    message: 'Selecciona una categoría',
  }),
})

type FormFields = z.infer<typeof schema>

export const useProductForm = () => {
  const router = useRouter()
  const { isPending, mutateAsync } = useCreateProduct()

  useEffect(() => {
    router.prefetch('/products')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   username: '',
    //   password: '',
    // },
  })

  const onSubmit = async (values: FormFields) => await mutateAsync(values)

  return {
    form,
    isPending,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
