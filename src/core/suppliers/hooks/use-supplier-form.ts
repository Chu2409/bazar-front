import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateSupplier, useUpdateSupplier } from './use-suppliers-service'
import { useSupplierStore } from '../context/use-supplier-store'
import { useEffect } from 'react'
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
  const supplier = useSupplierStore((state) => state.supplier)
  const onClose = useSupplierStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: createProduct } =
    useCreateSupplier()
  const { isPending: updatePending, mutateAsync: updateProduct } =
    // @ts-expect-error - product?.id is possibly undefined
    useUpdateSupplier(supplier?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  const defaultValues: FormFields = {
    // @ts-expect-error - supplier is possibly undefined
    name: supplier?.name,
    phone: supplier?.phone ?? undefined,
    address: supplier?.address ?? undefined,
    active: supplier?.active ?? true,
  }

  useEffect(() => {
    form.reset(defaultValues)

    form.clearErrors()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supplier])

  const onSubmit = async (values: FormFields) => {
    if (supplier) {
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
