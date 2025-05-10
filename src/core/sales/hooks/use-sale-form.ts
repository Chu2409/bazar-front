import { useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { useCreateSale, useUpdateSale } from './use-sales-service'
import { useSaleStore } from '../context/use-sale-store'
import { useEffect, useMemo } from 'react'
import { getChangedFields } from '@/common/utils/forms'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  subTotal: z.coerce.number({ message: 'Ingresa el subtotal' }).min(0, {
    message: 'Mínimo 0',
  }),
  discount: z.coerce
    .number({ message: 'Ingresa el descuento' })
    .min(0, {
      message: 'Mínimo 0',
    })
    .optional(),
  total: z.coerce.number({ message: 'Ingresa el total' }).min(0, {
    message: 'Mínimo 0',
  }),
  customerId: z.number({ message: 'Selecciona un cliente' }).min(1, {
    message: 'Selecciona un cliente',
  }),
  items: z
    .array(
      z.object({
        inventoryId: z.number({ message: 'Selecciona un producto' }).min(1, {
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
  const data = useSaleStore((state) => state.entity)
  const onClose = useSaleStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: createProduct } =
    useCreateSale()
  const { isPending: updatePending, mutateAsync: updateProduct } =
    // @ts-expect-error - product?.id is possibly undefined
    useUpdateSale(data?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  // @ts-expect-error - product is possibly undefined
  const defaultValues: FormFields = useMemo(
    () => ({
      subTotal: data?.subTotal,
      discount: data?.discount,
      total: data?.total,
      customerId: data?.customer.id,
      items:
        data?.items.map((item) => ({
          inventoryId: item.inventory.id,
          qty: item.qty,
          unitPrice: item.unitPrice,
          itemLabel: item.inventory.product.name,
          maxQty: item.inventory.stock + item.qty,
        })) ?? [],
    }),
    [data],
  )

  useEffect(() => {
    form.reset(defaultValues)
    form.clearErrors()
  }, [defaultValues, form])

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
    const subTotal = watchItems.reduce((acc, item) => {
      const itemTotal = (item.qty || 0) * (item.unitPrice || 0)
      return acc + itemTotal
    }, 0)

    form.setValue('subTotal', parseFloat(subTotal.toFixed(2)), {
      shouldDirty: true,
    })

    const discount = watchDiscount || 0
    const total = Math.max(0, subTotal - discount)

    form.setValue('total', parseFloat(total.toFixed(2)), { shouldDirty: true })
  }, [watchItems, watchDiscount, form])

  const onSubmit = async (values: FormFields) => {
    if (data) {
      const changedFields = getChangedFields(defaultValues, values)
      if (Object.keys(changedFields).length === 0) return

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
