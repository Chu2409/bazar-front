'use client'

import { Button } from '@/ui-components/button'
import { Pencil, Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useSaleForm } from '../../hooks/use-sale-form'
import { IOption } from '@/common/types/filters'
import { useSaleStore } from '../../context/use-sale-store'
import { useGetBySearchCustomers } from '@/core/customers/hooks/use-customers-service'
import RHFSearchableItemsArray from './items-input'
import { useMemo, useState } from 'react'
import RHFSearchableSelector from '@/common/components/rhf/searchable-selector'

export const SaleForm = () => {
  const { form, isPending, onSubmit, isDirty } = useSaleForm()
  const product = useSaleStore((state) => state.entity)

  const [custSearch, setCustSearch] = useState<string>('')
  const { data } = useGetBySearchCustomers({ search: custSearch })
  const customers: IOption[] = useMemo(() => {
    if (!data || data.length === 0) return []
    return data.map((ent) => ({
      id: ent.id,
      label: ent.person.firstName + ' ' + ent.person.firstSurname,
    }))
  }, [data])

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-4'>
        <div className='grid grid-cols-2 gap-6 items-start'>
          <div className='grid gap-6'>
            <RHFSearchableSelector
              name='customerId'
              onSearchChange={setCustSearch}
              label='Cliente'
              placeholder='Selecciona un cliente'
              options={customers}
              required
            />

            <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
              <RHFInput
                name='subTotal'
                label='Sub Total'
                placeholder='42.5'
                type='number'
                required
              />

              <RHFInput
                name='discount'
                label='Descuento'
                placeholder='5'
                type='number'
                required
              />

              <RHFInput
                name='total'
                label='Total'
                placeholder='37.5'
                type='number'
                required
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
