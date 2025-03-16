'use client'

import { Button } from '@/ui-components/button'
import { Pencil, Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useInventoryForm } from '../../hooks/use-inventory-form'
import { useInventoryStore } from '../../context/use-inventory-store'
import { useGetBySearchProducts } from '@/core/products/hooks/use-products-service'
import { IOption } from '@/common/types/filters'
import { useGetBySearchSuppliers } from '@/core/suppliers/hooks/use-suppliers-service'
import RHFSearchableSelector from '@/common/components/rhf/searchable-selector'
import { useMemo, useState } from 'react'

export const InventoryForm = () => {
  const { form, isPending, onSubmit, isDirty } = useInventoryForm()
  const data = useInventoryStore((state) => state.data)

  const [suppliersSearch, setSuppliersSearch] = useState<string>('')
  const { data: sup } = useGetBySearchSuppliers({ search: suppliersSearch })
  const suppliers: IOption[] = useMemo(() => {
    if (!sup || sup.length === 0) return []
    return sup.map((ent) => ({
      id: ent.id,
      label: ent.name,
    }))
  }, [sup])

  const [productsSearch, setProductsSearch] = useState<string>('')
  const { data: pro } = useGetBySearchProducts({ search: productsSearch })
  const products: IOption[] = useMemo(() => {
    if (!pro || pro.length === 0) return []
    return pro.map((ent) => ({
      id: ent.id,
      label: ent.name,
    }))
  }, [pro])

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-6 w-full'>
        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput
            name='purchasedQty'
            label='Cantidad Comprada'
            type='number'
            placeholder='10'
            required
          />

          <RHFInput name='stock' label='Stock' type='number' placeholder='10' />

          <RHFInput
            name='unitCost'
            label='Costo Unitario'
            type='number'
            placeholder='1.00'
            required
          />

          <RHFInput
            name='totalCost'
            label='Costo Total'
            type='number'
            placeholder='1.00'
            required
          />
        </div>

        <RHFSearchableSelector
          name='productId'
          onSearchChange={setProductsSearch}
          label='Producto'
          placeholder='Selecciona un producto'
          options={products}
          required
        />

        <RHFSearchableSelector
          name='supplierId'
          onSearchChange={setSuppliersSearch}
          label='Proveedor'
          placeholder='Selecciona un proveedor'
          options={suppliers}
          required
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
