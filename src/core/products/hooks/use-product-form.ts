import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateProduct } from './use-products-service'
import { useProductStore } from '../context/use-product-store'
import { useEffect } from 'react'

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
  const product = useProductStore((state) => state.product)

  const { isPending, mutateAsync } = useCreateProduct()

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      barcode: product?.barcode || undefined,
      name: product?.name,
      description: product?.description || undefined,
      retailPrice: product?.retailPrice,
      wholesalePrice: product?.wholesalePrice,
      wholesaleQty: product?.wholesaleQty,
      minStock: product?.minStock,
      image: product?.image || undefined,
      active: product?.active,
      categoryId: product?.categoryId,
    },
  })

  useEffect(() => {
    form.reset({
      barcode: product?.barcode || undefined,
      name: product?.name,
      description: product?.description || undefined,
      retailPrice: product?.retailPrice,
      wholesalePrice: product?.wholesalePrice,
      wholesaleQty: product?.wholesaleQty,
      minStock: product?.minStock,
      image: product?.image || undefined,
      active: product?.active,
      categoryId: product?.categoryId,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const onSubmit = async (values: FormFields) => await mutateAsync(values)

  return {
    form,
    isPending,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
