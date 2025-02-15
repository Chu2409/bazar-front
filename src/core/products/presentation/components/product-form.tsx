'use client'

import { Button } from '@/ui-components/button'
import { Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useProductForm } from '../../hooks/use-product-form'
import { useCategoriesFindAll } from '@/core/categories/hooks/use-categories-service'
import RHFSelector from '@/common/components/rhf/selector'
import { IOption } from '@/common/types/filters'
import RHFCheckbox from '@/common/components/rhf/checkbox'
import RHFImageUpload from '@/common/components/rhf/image-upload'

export const ProductForm = () => {
  const { form, isPending, onSubmit } = useProductForm()
  const { data } = useCategoriesFindAll()

  const categories: IOption[] =
    data?.records.map((category) => ({
      id: category.id,
      label: category.name,
    })) ?? []

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-6 w-full '>
        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput name='name' label='Nombre' placeholder='Ligas Multicolor' />

          <RHFInput
            name='barcode'
            label='Código de barras'
            placeholder='1234567890'
          />
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
          />

          <RHFInput
            name='wholesalePrice'
            label='Precio de mayoreo'
            type='number'
            placeholder='1.15'
          />
        </div>

        <div className='grid gap-x-2 grid-cols-2 gap-y-6'>
          <RHFInput
            name='wholesaleQty'
            label='Cantidad de mayoreo'
            type='number'
            placeholder='12'
          />

          <RHFInput
            name='minStock'
            label='Cantidad mínima en stock'
            type='number'
            placeholder='8'
          />
        </div>

        <RHFSelector
          name='categoryId'
          label='Categoría'
          placeholder='Selecciona una categoría'
          options={categories}
        />

        <RHFCheckbox
          name='active'
          label='Activo'
          placeholder='Activo'
          description='Estado del producto'
        />

        <RHFImageUpload name='image' label='Imagen' />

        <Button
          disabled={isPending}
          type='submit'
          className='w-full gap-x-2 mt-4'
        >
          Crear
          <Plus className='w-4 h-4' />
        </Button>
      </form>
    </FormProvider>
  )
}
