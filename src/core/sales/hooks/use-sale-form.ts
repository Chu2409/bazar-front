// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateSale, useUpdateSale } from './use-sales-service'
import { useSaleStore } from '../context/use-sale-store'
import { useEffect } from 'react'
import { getChangedFields } from '@/common/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  subTotal: z.coerce.number({ message: 'Ingresa el subtotal' }).min(0, {
    message: 'Mínimo 0',
  }),
  discount: z.coerce.number({ message: 'Ingresa el descuento' }).min(0, {
    message: 'Mínimo 0',
  }),
  total: z.coerce.number({ message: 'Ingresa el total' }).min(0, {
    message: 'Mínimo 0',
  }),
  customerId: z.number({ message: 'Selecciona un cliente' }).min(1, {
    message: 'Selecciona un cliente',
  }),
  items: z.array(
    z.object({
      lotId: z.number({ message: 'Selecciona un producto' }).min(1, {
        message: 'Selecciona un producto',
      }),
      qty: z.coerce.number({ message: 'Ingresa la cantidad' }).min(0, {
        message: 'Mínimo 0',
      }),
      unitPrice: z.coerce.number({ message: 'Ingresa el precio' }).min(0, {
        message: 'Mínimo 0',
      }),
    }),
  ),
})

type FormFields = z.infer<typeof schema>

export const useSaleForm = () => {
  const entity = useSaleStore((state) => state.entity)
  const onClose = useSaleStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: createProduct } =
    useCreateSale()
  const { isPending: updatePending, mutateAsync: updateProduct } =
    // @ts-expect-error - product?.id is possibly undefined
    useUpdateSale(entity?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const defaultValues: FormFields = {
    subTotal: entity?.subTotal,
    discount: entity?.discount,
    total: entity?.total,
    customerId: entity?.customerId,
    items: entity?.items ?? [],
  }

  useEffect(() => {
    form.reset(defaultValues)

    form.clearErrors()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity])

  const onSubmit = async (values: FormFields) => {
    if (entity) {
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
