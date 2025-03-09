// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useInventoryStore } from '../context/use-inventory-store'
import { useEffect } from 'react'
import { useInventoryCreate, useInventoryUpdate } from './use-inventory-service'
import { getChangedFields } from '@/common/utils/forms'

const schema = z.object({
  purchasedQty: z.coerce
    .number({ message: 'La cantidad comprada es requerida' })
    .nonnegative({ message: 'La cantidad comprada debe ser mayor a 0' }),
  stock: z.coerce
    .number({ message: 'El stock es requerido' })
    .nonnegative({
      message: 'El stock debe ser mayor a 0',
    })
    .optional(),
  unitCost: z.coerce
    .number({ message: 'El costo de compra es requerido' })
    .nonnegative({
      message: 'El costo de compra debe ser mayor a 0',
    }),
  totalCost: z.coerce
    .number({ message: 'El costo total de compra es requerido' })
    .nonnegative({
      message: 'El costo total de compra debe ser mayor a 0',
    }),
  productId: z.coerce.number({ message: 'Seleccione un producto' }).min(1, {
    message: 'Seleccione un producto',
  }),
  supplierId: z.coerce.number({ message: 'Seleccione un proveedor' }).min(1, {
    message: 'Seleccione un proveedor',
  }),
})

type FormFields = z.infer<typeof schema>

export const useInventoryForm = () => {
  const data = useInventoryStore((state) => state.data)
  const onClose = useInventoryStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: create } = useInventoryCreate()
  const { isPending: updatePending, mutateAsync: update } =
    // @ts-expect-error - product?.id is possibly undefined
    useInventoryUpdate(data?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const defaultValues: FormFields = {
    purchasedQty: data?.purchasedQty,
    stock: data?.stock,
    unitCost: data?.unitCost,
    totalCost: data?.totalCost,
    productId: data?.product.id,
    supplierId: data?.supplier.id,
  }

  useEffect(() => {
    form.reset(defaultValues)
    form.clearErrors()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onSubmit = async (values: FormFields) => {
    if (data) {
      const changedFields = getChangedFields(data, values)
      const updated = await update(changedFields)

      if (updated) onClose()
    } else {
      const created = await create(values)
      if (created) onClose()
    }
  }

  return {
    form,
    isDirty: form.formState.isDirty,
    isPending: createPending || updatePending,
    onSubmit: form.handleSubmit(onSubmit),
  }
}
