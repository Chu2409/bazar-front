'use client'

import { Button } from '@/ui-components/button'
import { Plus } from 'lucide-react'
import RHFInput from '@/common/components/rhf/input'
import { FormProvider } from 'react-hook-form'
import { useProductForm } from '../../hooks/use-product-form'

export const ProductForm = () => {
  const { form, isPending, onSubmit } = useProductForm()

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className='grid gap-4 w-full '>
        <RHFInput name='name' label='Nombre' placeholder='Ligas Multicolor' />

        <RHFInput name='name' label='Nombre' placeholder='Ligas Multicolor' />

        <RHFInput
          name='description'
          label='Descripción'
          placeholder='Ligas de colores surtidos'
        />

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

        <RHFInput
          name='image'
          label='Imagen'
          type='file'
          placeholder='Selecciona una imagen'
        />

        <RHFInput
          name='active'
          label='Activo'
          type='checkbox'
          placeholder='Activo'
        />

        <RHFInput
          name='categoryId'
          label='Categoría'
          type='select'
          placeholder='Selecciona una categoría'
        />

        <Button disabled={isPending} type='submit' className='w-full gap-x-2'>
          Crear
          <Plus className='w-4 h-4' />
        </Button>
      </form>
    </FormProvider>
  )
}
