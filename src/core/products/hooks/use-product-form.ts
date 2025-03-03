import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateProduct, useUpdateProduct } from './use-products-service'
import { useProductStore } from '../context/use-product-store'
import { useEffect } from 'react'
import { getChangedFields } from '@/common/utils/forms'

const schema = z.object({
  barcode: z.string().optional(),
  name: z.string({ message: 'Ingresa el nombre del producto' }).min(5, {
    message: 'Mínimo 5 caracteres',
  }),
  description: z.string().optional(),
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
  const product = useProductStore((state) => state.product)
  const onClose = useProductStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: createProduct } =
    useCreateProduct()
  const { isPending: updatePending, mutateAsync: updateProduct } =
    // @ts-expect-error - product?.id is possibly undefined
    useUpdateProduct(product?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const defaultValues = {
    barcode: product?.barcode ?? undefined,
    description: product?.description ?? undefined,
    image: product?.image ?? undefined,
    name: product?.name,
    retailPrice: product?.retailPrice,
    wholesalePrice: product?.wholesalePrice,
    wholesaleQty: product?.wholesaleQty,
    minStock: product?.minStock,
    categoryId: product?.categoryId,
    active: product?.active ?? true,
  }

  useEffect(() => {
    form.reset(defaultValues)

    form.clearErrors()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product])

  const onSubmit = async (values: FormFields) => {
    if (product) {
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
