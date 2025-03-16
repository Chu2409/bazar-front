'use client'

import { Button } from '@/ui-components/button'
import { Pencil, Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useCategoryForm } from '../../hooks/use-categories-form'
import RHFCheckbox from '@/common/components/rhf/checkbox'
import { useCategoryStore } from '../../context/use-category-store'

export const CategoryForm = () => {
  const { form, isPending, onSubmit, isDirty } = useCategoryForm()
  const data = useCategoryStore((state) => state.data)

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-6 w-full'>
        <RHFInput
          name='name'
          label='Nombre'
          placeholder='Útiles Escolares'
          required
        />

        <RHFCheckbox
          name='active'
          label='Activo'
          placeholder='Activo'
          description='Estado de la categoría'
        />

        <Button
          disabled={isPending || !isDirty}
          type='submit'
          className='w-full gap-x-2 mt-2'
        >
          {data ? 'Actualizar' : 'Agregar'}

          {data ? <Pencil className='w-4 h-4' /> : <Plus className='w-4 h-4' />}
        </Button>
      </form>
    </FormProvider>
  )
}
