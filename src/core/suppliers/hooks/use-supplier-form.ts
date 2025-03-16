import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateSupplier, useUpdateSupplier } from './use-suppliers-service'
import { useSupplierStore } from '../context/use-supplier-store'
import { useEffect, useMemo } from 'react'
import { getChangedFields } from '@/common/utils/forms'

const schema = z.object({
  name: z.string({ message: 'Ingresa el nombre del proveedor' }).min(5, {
    message: 'Mínimo 5 caracteres',
  }),
  phone: z
    .string({ message: 'Ingresa el número de teléfono del proveedor' })
    .regex(/^\d+$/, 'Debe contener solo números')
    .optional(),
  address: z
    .string({ message: 'Ingresa la dirección del proveedor' })
    .optional(),
  active: z.boolean().default(true),
})

type FormFields = z.infer<typeof schema>

export const useSupplierForm = () => {
  const data = useSupplierStore((state) => state.supplier)
  const onClose = useSupplierStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: createProduct } =
    useCreateSupplier()
  const { isPending: updatePending, mutateAsync: updateProduct } =
    // @ts-expect-error - product?.id is possibly undefined
    useUpdateSupplier(data?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  // @ts-expect-error - product is possibly undefined
  const defaultValues: FormFields = useMemo(
    () => ({
      name: data?.name,
      phone: data?.phone ?? undefined,
      address: data?.address ?? undefined,
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
      const updated = await updateProduct(changedFields)
      if (updated) onClose()
    } else {
      const created = await createProduct(values)
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
