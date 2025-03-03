'use client'

import { Button } from '@/ui-components/button'
import { Pencil, Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useCustomerForm } from '../../hooks/use-customer-form'
import RHFCheckbox from '@/common/components/rhf/checkbox'
import { useCustomerStore } from '../../context/use-customer-store'
import RHFArrayMultiInput from '@/common/components/rhf/array-input'
import RHFIdentificationArray from './identifications-input'

export const CustomerForm = () => {
  const { form, isPending, onSubmit, isDirty } = useCustomerForm()
  const data = useCustomerStore((state) => state.data)

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-6 w-full'>
        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput
            name='person.firstName'
            label='1er Nombre'
            placeholder='Erick'
          />

          <RHFInput
            name='person.secondName'
            label='2do Nombre'
            placeholder='Daniel'
          />

          <RHFInput
            name='person.firstSurname'
            label='1er Apellido'
            placeholder='Zhu'
          />

          <RHFInput
            name='person.secondSurname'
            label='2do Apellido'
            placeholder='Ordóñez'
          />
        </div>

        <RHFArrayMultiInput
          name='person.phoneNumbers'
          label='Teléfonos'
          buttonLabel='Agregar Teléfono'
          placeholder='0999999999'
        />

        <RHFIdentificationArray
          name='person.identifications'
          label='Identificaciones'
          buttonLabel='Agregar Identificación'
        />

        <RHFInput
          name='person.email'
          label='Correo'
          placeholder='dzhu2409@gmail.com'
        />

        <RHFInput
          name='address'
          label='Dirección'
          placeholder='10 de Agosto y 9na Norte'
        />

        <RHFCheckbox
          name='active'
          label='Activo'
          placeholder='Activo'
          description='Estado del cliente'
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
