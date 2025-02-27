import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCreateCategory, useUpdateCategory } from './use-categories-service'
import { useCategoryStore } from '../context/use-category-store'
import { useEffect } from 'react'
import { getChangedFields } from '@/common/utils/field-changes'

const schema = z.object({
  name: z.string({ message: 'Ingresa el nombre de la categoría' }).min(5, {
    message: 'Mínimo 5 caracteres',
  }),
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

  const defaultValues: FormFields = {
    // @ts-expect-error - data is possibly undefined
    name: data?.name,
    active: data?.active ?? true,
  }

  useEffect(() => {
    form.reset(defaultValues)

    form.clearErrors()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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
