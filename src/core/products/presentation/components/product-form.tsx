'use client'

import { Button } from '@/ui-components/button'
import { Pencil, Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useProductForm } from '../../hooks/use-product-form'
import { IOption } from '@/common/types/filters'
import RHFCheckbox from '@/common/components/rhf/checkbox'
import RHFImageUpload from '@/common/components/rhf/image-upload'
import { useProductStore } from '../../context/use-product-store'
import { useGetBySearchCategories } from '@/core/categories/hooks/use-categories-service'
import { useMemo, useState } from 'react'
import RHFSearchableSelector from '@/common/components/rhf/searchable-selector'

export const ProductForm = () => {
  const { form, isPending, onSubmit, isDirty } = useProductForm()
  const product = useProductStore((state) => state.product)

  const [categoriesSearch, setCategoriesSearch] = useState<string>('')
  const { data } = useGetBySearchCategories({ search: categoriesSearch })
  const categories: IOption[] = useMemo(() => {
    if (!data || data.length === 0) return []
    return data.map((category) => ({
      id: category.id,
      label: category.name,
    }))
  }, [data])

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-5 w-full '>
        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput
            name='name'
            label='Nombre'
            placeholder='Ligas Multicolor'
            required
          />

          {/* <RHFBarcodeScanner
            name='barcode'
            label='Código de barras'
            placeholder='Escanea o ingresa el código'
          /> */}
        </div>

        <RHFInput
          name='description'
          label='Descripción'
          placeholder='Ligas de colores surtidos'
        />

        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput
            name='retailPrice'
            label='Precio de venta'
            type='number'
            placeholder='1.25'
            required
          />

          <RHFInput
            name='wholesalePrice'
            label='Precio de mayoreo'
            type='number'
            placeholder='1.15'
            required
          />
        </div>

        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput
            name='wholesaleQty'
            label='Cantidad de mayoreo'
            type='number'
            placeholder='12'
            required
          />

          <RHFInput
            name='minStock'
            label='Cantidad mínima en stock'
            type='number'
            placeholder='8'
            required
          />
        </div>

        <RHFSearchableSelector
          name='categoryId'
          onSearchChange={setCategoriesSearch}
          label='Categoría'
          placeholder='Selecciona una categoría'
          options={categories}
          required
        />

        <RHFCheckbox
          name='active'
          label='Activo'
          placeholder='Activo'
          description='Estado del producto'
        />

        <RHFImageUpload name='image' label='Imagen' />

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
