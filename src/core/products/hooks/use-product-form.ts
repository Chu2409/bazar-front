import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateProduct, useUpdateProduct } from './use-products-service'
import { useProductStore } from '../context/use-product-store'
import { useEffect, useMemo } from 'react'
import { getChangedFields } from '@/common/utils/forms'

const schema = z.object({
  barcode: z
    .string({ message: 'Ingrese el código de barras' })
    .regex(/^\d+$/, 'Debe contener solo números')
    .optional(),
  name: z.string({ message: 'Ingresa el nombre del producto' }).min(5, {
    message: 'Mínimo 5 caracteres',
  }),
  description: z
    .string({ message: 'Ingresa la descripcion del producto' })
    .min(5, {
      message: 'Mínimo 5 caracteres',
    })
    .optional(),
  retailPrice: z.coerce
    .number({ message: 'Ingresa el precio de venta' })
    .min(0, {
      message: 'Mínimo 0',
    }),
  wholesalePrice: z.coerce
    .number({ message: 'Ingresa el precio de mayoreo' })
    .min(0, {
      message: 'Mínimo 0',
    }),
  wholesaleQty: z.coerce
    .number({ message: 'Ingresa la cantidad de mayoreo' })
    .min(0, {
      message: 'Mínimo 0',
    }),
  minStock: z.coerce
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
  const data = useProductStore((state) => state.product)
  const onClose = useProductStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: createProduct } =
    useCreateProduct()
  const { isPending: updatePending, mutateAsync: updateProduct } =
    // @ts-expect-error - product?.id is possibly undefined
    useUpdateProduct(data?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  // @ts-expect-error - product is possibly undefined
  const defaultValues: FormFields = useMemo(
    () => ({
      barcode: data?.barcode ?? undefined,
      description: data?.description ?? undefined,
      image: data?.image ?? undefined,
      name: data?.name,
      retailPrice: data?.retailPrice,
      wholesalePrice: data?.wholesalePrice,
      wholesaleQty: data?.wholesaleQty,
      minStock: data?.minStock,
      categoryId: data?.category.id,
      active: data?.active ?? true,
    }),
    [data],
  )

  useEffect(() => {
    form.reset(defaultValues)
    form.clearErrors()
  }, [defaultValues, form])

  const onSubmit = async (values: FormFields) => {
    if (data) {
      const changedFields = getChangedFields(defaultValues, values)

      await updateProduct(changedFields)
    } else {
      await createProduct(values)
    }

    onClose()
  }

  return {
    form,
    isDirty: form.formState.isDirty,
    isPending: createPending || updatePending,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
