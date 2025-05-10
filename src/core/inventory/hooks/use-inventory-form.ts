import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useInventoryStore } from '../context/use-inventory-store'
import { useEffect, useMemo, useRef } from 'react'
import { useInventoryCreate, useInventoryUpdate } from './use-inventory-service'
import { getChangedFields } from '@/common/utils/forms'

const schema = z.object({
  purchasedQty: z.coerce
    .number({ message: 'La cantidad comprada es requerida' })
    .nonnegative({ message: 'La cantidad comprada debe ser mayor a 0' }),
  stock: z.coerce
    .number({ message: 'El stock es requerido' })
    .nonnegative({ message: 'El stock debe ser mayor a 0' })
    .optional(),
  unitCost: z.coerce
    .number({ message: 'El costo de compra es requerido' })
    .nonnegative({ message: 'El costo de compra debe ser mayor a 0' }),
  totalCost: z.coerce
    .number({ message: 'El costo total de compra es requerido' })
    .nonnegative({ message: 'El costo total de compra debe ser mayor a 0' }),
  productId: z.coerce
    .number({ message: 'Seleccione un producto' })
    .min(1, { message: 'Seleccione un producto' }),
  supplierId: z.coerce
    .number({ message: 'Seleccione un proveedor' })
    .min(1, { message: 'Seleccione un proveedor' }),
})

type FormFields = z.infer<typeof schema>

export const useInventoryForm = () => {
  const data = useInventoryStore((state) => state.data)
  const onClose = useInventoryStore((state) => state.onClose)
  const { isPending: createPending, mutateAsync: create } = useInventoryCreate()
  const { isPending: updatePending, mutateAsync: update } = useInventoryUpdate(
    // @ts-expect-error - product?.id is possibly undefined
    data?.id,
  )

  const stockModifiedRef = useRef(false)
  const totalCostModifiedRef = useRef(false)

  // @ts-expect-error - product is possibly undefined
  const defaultValues: FormFields = useMemo(
    () => ({
      purchasedQty: data?.purchasedQty,
      stock: data?.stock,
      unitCost: data?.unitCost,
      totalCost: data?.totalCost,
      productId: data?.product.id,
      supplierId: data?.supplier.id,
    }),
    [data],
  )

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    form.reset(defaultValues)

    if (data) {
      stockModifiedRef.current = true
      totalCostModifiedRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, form])

  // Observer para actualizar automáticamente stock y totalCost
  useEffect(() => {
    const subscription = form.watch((values, { name, type }) => {
      if (type !== 'change') return

      const purchasedQty = values.purchasedQty
      const unitCost = values.unitCost

      // Si cambia purchasedQty y stock no ha sido modificado manualmente, actualizar stock
      if (
        name === 'purchasedQty' &&
        !stockModifiedRef.current &&
        purchasedQty !== undefined
      ) {
        form.setValue('stock', purchasedQty, { shouldDirty: true })
      }

      // Si cambia purchasedQty o unitCost y totalCost no ha sido modificado manualmente, recalcular totalCost
      if (
        (name === 'purchasedQty' || name === 'unitCost') &&
        !totalCostModifiedRef.current
      ) {
        if (purchasedQty !== undefined && unitCost !== undefined) {
          form.setValue('totalCost', purchasedQty * unitCost, {
            shouldDirty: true,
          })
        }
      }

      // Marcar campos como modificados manualmente si corresponde
      if (name === 'stock') {
        stockModifiedRef.current = true
      }
      if (name === 'totalCost') {
        totalCostModifiedRef.current = true
      }
    })

    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = async (values: FormFields) => {
    if (data) {
      const changedFields = getChangedFields(data, values)
      if (Object.keys(changedFields).length === 0) return

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
