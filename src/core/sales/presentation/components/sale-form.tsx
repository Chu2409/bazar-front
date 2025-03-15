'use client'

import { Button } from '@/ui-components/button'
import { Pencil, Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useSaleForm } from '../../hooks/use-sale-form'
import RHFSelector from '@/common/components/rhf/selector'
import { IOption } from '@/common/types/filters'
import { useSaleStore } from '../../context/use-sale-store'
import { useCustomersFindAll } from '@/core/customers/hooks/use-customers-service'
import RHFSearchableItemsArray from './items-input'

export const SaleForm = () => {
  const { form, isPending, onSubmit, isDirty } = useSaleForm()
  const { data: customersToFilter } = useCustomersFindAll({})
  const product = useSaleStore((state) => state.entity)

  const customers: IOption[] =
    customersToFilter?.records.map((customer) => ({
      id: customer.id,
      label: customer.person.firstName + ' ' + customer.person.firstSurname,
    })) ?? []

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-4'>
        <div className='grid grid-cols-2 gap-6 items-start'>
          <div className='grid gap-6'>
            <RHFSelector
              name='customerId'
              label='Cliente'
              options={customers}
              placeholder='Selecciona un cliente'
            />

            <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
              <RHFInput
                name='subTotal'
                label='Sub Total'
                placeholder='42.5'
                type='number'
              />

              <RHFInput
                name='discount'
                label='Descuento'
                placeholder='5'
                type='number'
              />

              <RHFInput
                name='total'
                label='Total'
                placeholder='37.5'
                type='number'
              />
            </div>
          </div>

          <div>
            <RHFSearchableItemsArray name='items' label='Items' />
          </div>
        </div>

        <Button
          disabled={isPending || !isDirty}
          type='submit'
          className='w-full gap-x-2 mt-2'
        >
          {product ? 'Actualizar' : 'Agregar'}

          {product ? (
            <Pencil className='w-4 h-4' />
          ) : (
            <Plus className='w-4 h-4' />
          )}
        </Button>
      </form>
    </FormProvider>
  )
}
