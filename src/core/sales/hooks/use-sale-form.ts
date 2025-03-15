// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useForm, useWatch } from 'react-hook-form'
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
  items: z
    .array(
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
    )
    .min(1, { message: 'Ingrese al menos un item' }),
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
    items:
      entity?.items.map((item) => ({
        lotId: item.lotId,
        qty: item.qty,
        unitPrice: item.unitPrice,
        itemLabel: item.lot.product.name,
      })) ?? [],
  }

  useEffect(() => {
    form.reset(defaultValues)
    form.clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity])

  const watchItems = useWatch({
    control: form.control,
    name: 'items',
    defaultValue: defaultValues.items,
  })

  const watchDiscount = useWatch({
    control: form.control,
    name: 'discount',
    defaultValue: defaultValues.discount,
  })

  useEffect(() => {
    // Calcular subtotal sumando precio * cantidad de cada item
    const subTotal = watchItems.reduce((acc, item) => {
      const itemTotal = (item.qty || 0) * (item.unitPrice || 0)
      return acc + itemTotal
    }, 0)

    // Actualizar subtotal
    form.setValue('subTotal', subTotal, { shouldDirty: true })

    // Calcular total (subtotal - descuento)
    const discount = watchDiscount || 0
    const total = Math.max(0, subTotal - discount)

    // Actualizar total
    form.setValue('total', total, { shouldDirty: true })
  }, [watchItems, watchDiscount, form])

  const onSubmit = async (values: FormFields) => {
    if (entity) {
      const changedFields = getChangedFields(defaultValues, values)
      const updated = await updateProduct(changedFields)
      if (updated) onClose()
    } else {
      const updated = await createProduct(values)
      if (updated) onClose()
    }
  }

  return {
    form,
    isDirty: form.formState.isDirty,
    isPending: createPending || updatePending,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
