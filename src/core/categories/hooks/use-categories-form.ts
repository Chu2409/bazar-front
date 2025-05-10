import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateCategory, useUpdateCategory } from './use-categories-service'
import { useCategoryStore } from '../context/use-category-store'
import { useEffect, useMemo } from 'react'
import { getChangedFields } from '@/common/utils/forms'

const schema = z.object({
  name: z
    .string({ message: 'Ingresa el nombre de la categoría' })
    .min(3, {
      message: 'Mínimo 3 caracteres',
    })
    .trim(),
  active: z.boolean().default(true),
})

type FormFields = z.infer<typeof schema>

export const useCategoryForm = () => {
  const data = useCategoryStore((state) => state.data)
  const onClose = useCategoryStore((state) => state.onClose)

  const { isPending: createPending, mutateAsync: createProduct } =
    useCreateCategory()
  const { isPending: updatePending, mutateAsync: updateProduct } =
    // @ts-expect-error - product?.id is possibly undefined
    useUpdateCategory(data?.id)

  const form = useForm<FormFields>({
    resolver: zodResolver(schema),
  })

  // @ts-expect-error - product is possibly undefined
  const defaultValues: FormFields = useMemo(
    () => ({
      name: data?.name,
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
      if (Object.keys(changedFields).length === 0) return

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
