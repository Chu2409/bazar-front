'use client'

import { Button } from '@/ui-components/button'
import { Pencil, Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useInventoryForm } from '../../hooks/use-inventory-form'
import { useInventoryStore } from '../../context/use-inventory-store'
import RHFSelector from '@/common/components/rhf/selector'
import { useProductsFindAll } from '@/core/products/hooks/use-products-service'
import { IOption } from '@/common/types/filters'
import { useSuppliersFindAll } from '@/core/suppliers/hooks/use-suppliers-service'

export const InventoryForm = () => {
  const { form, isPending, onSubmit, isDirty } = useInventoryForm()
  const { data: productsToFilter } = useProductsFindAll({})
  const { data: suppliersToFilter } = useSuppliersFindAll({})
  const data = useInventoryStore((state) => state.data)

  const products: IOption[] =
    productsToFilter?.records.map((product) => ({
      id: product.id,
      label: product.name,
    })) ?? []

  const suppliers: IOption[] =
    suppliersToFilter?.records.map((supplier) => ({
      id: supplier.id,
      label: supplier.name,
    })) ?? []

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-6 w-full'>
        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput
            name='purchasedQty'
            label='Cantidad Comprada'
            type='number'
            placeholder='10'
          />

          <RHFInput name='stock' label='Stock' type='number' placeholder='10' />

          <RHFInput
            name='unitCost'
            label='Costo Unitario'
            type='number'
            placeholder='1.00'
          />

          <RHFInput
            name='totalCost'
            label='Costo Total'
            type='number'
            placeholder='1.00'
          />
        </div>

        <RHFSelector
          name='productId'
          label='Producto'
          placeholder='Selecciona un producto'
          options={products}
        />

        <RHFSelector
          name='supplierId'
          label='Proveedor'
          placeholder='Selecciona un proveedor'
          options={suppliers}
        />

        {data && (
          <>
            <p className='text-sm font-semibold'>Otros Detalles</p>

            <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
              <RHFInput
                disabled
                name='product'
                label='Producto'
                value={data?.product.name}
              />

              <RHFInput
                disabled
                name='retailPrice'
                label='Precio/Menor'
                value={data?.product.retailPrice}
              />

              <RHFInput
                disabled
                name='wholesalePrice'
                label='Precio/Mayor'
                value={data?.product.wholesalePrice}
              />

              <RHFInput
                disabled
                name='supplier'
                label='Proveedor'
                value={data?.supplier.name}
              />
            </div>
          </>
        )}

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
