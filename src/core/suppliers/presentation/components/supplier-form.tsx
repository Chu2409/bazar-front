'use client'

import { Button } from '@/ui-components/button'
import { Pencil, Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useSupplierForm } from '../../hooks/use-supplier-form'
import RHFCheckbox from '@/common/components/rhf/checkbox'
import { useSupplierStore } from '../../context/use-supplier-store'

export const SupplierForm = () => {
  const { form, isPending, onSubmit, isDirty } = useSupplierForm()
  const supplier = useSupplierStore((state) => state.supplier)

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-5 w-full '>
        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput name='phone' label='Teléfono' placeholder='1234567890' />

          <RHFInput name='name' label='Nombre' placeholder='Multiplaza' />
        </div>

        <RHFInput
          name='address'
          label='Dirección'
          placeholder='Av. Bolivariana'
        />

        <RHFCheckbox
          name='active'
          label='Activo'
          placeholder='Activo'
          description='Estado del producto'
        />

        <Button
          disabled={isPending || !isDirty}
          type='submit'
          className='w-full gap-x-2 mt-2'
        >
          {supplier ? 'Actualizar' : 'Agregar'}

          {supplier ? (
            <Pencil className='w-4 h-4' />
          ) : (
            <Plus className='w-4 h-4' />
          )}
        </Button>
      </form>
    </FormProvider>
  )
}
