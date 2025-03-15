/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from 'lucide-react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '@/ui-components/button'
import { Input } from '@/ui-components/input'
import { Label } from '@/ui-components/label'
import { cn } from '@/common/lib/utils'
import { IInventoryWithProductSupplier } from '@/core/inventory/models/inventory'
import { getError } from '@/common/utils/forms'
import { ItemsSelector } from './items-selector'

interface Props {
  name: string
  label: string
  disabled?: boolean
  allowDuplicates?: boolean
}

const RHFAccumulativeItemsArray = ({
  name,
  label,
  disabled,
  allowDuplicates = false,
}: Props) => {
  const {
    control,
    formState: { errors },
    trigger,
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: name,
  })

  const error = getError(name, errors)

  const handleItemSelect = (value: IInventoryWithProductSupplier) => {
    if (!allowDuplicates) {
      const exists = fields.some((field: any) => field.lotId === value.id)
      if (exists) {
        return
      }
    }

    append({
      lotId: value.id,
      itemLabel: value.product.name,
      qty: 1,
      unitPrice: value.product.retailPrice,
    })
  }

  return (
    <div className='flex flex-col gap-3'>
      <Label className={error ? 'text-red-500' : ''}>{label}</Label>

      <div className='mb-2'>
        <ItemsSelector onChange={handleItemSelect} disabled={disabled} />
      </div>

      {fields.length > 0 ? (
        <div className='space-y-4'>
          {fields.map((field: any, index) => {
            const quantityErrorPath = `${name}.${index}.qty`
            const priceErrorPath = `${name}.${index}.unitPrice`

            const quantityError = getError(quantityErrorPath, errors)
            const priceError = getError(priceErrorPath, errors)

            return (
              <div
                key={field.id}
                className='flex flex-col gap-2 p-3 py-2 border rounded-md bg-slate-50'
              >
                <div className='flex items-start gap-2'>
                  {/* Mostrar el item seleccionado */}
                  <Controller
                    control={control}
                    name={`${name}.${index}.itemLabel`}
                    render={({ field }) => (
                      <div className='flex-1 pt-6'>
                        <div className='font-medium'>{field.value}</div>
                      </div>
                    )}
                  />

                  {/* Input para la cantidad */}
                  <div className='w-20'>
                    <Label className='text-sm mb-1 block'>Cantidad</Label>

                    <Controller
                      control={control}
                      name={`${name}.${index}.qty`}
                      render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                          type='number'
                          min='1'
                          step='1'
                          value={value || ''}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === '') {
                              onChange(undefined)
                            } else {
                              onChange(value)
                            }
                          }}
                          onBlur={() => {
                            onBlur()
                            trigger(`${name}.${index}.qty`)
                          }}
                          className={cn(
                            'w-full bg-background',
                            quantityError ? 'border-red-500' : '',
                          )}
                          placeholder='Cantidad'
                          disabled={disabled}
                        />
                      )}
                    />

                    {quantityError && (
                      <p className='text-red-500 text-xs italic mt-1'>
                        {quantityError}
                      </p>
                    )}
                  </div>

                  <div className='w-40'>
                    <Label className='text-sm mb-1 block'>Precio</Label>

                    <Controller
                      control={control}
                      name={`${name}.${index}.unitPrice`}
                      render={({ field: { onChange, value, onBlur } }) => (
                        <Input
                          type='number'
                          min='0'
                          step='0.01'
                          value={value || ''}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value === '') {
                              onChange(undefined)
                            } else {
                              onChange(value)
                            }
                          }}
                          onBlur={() => {
                            onBlur()
                            trigger(`${name}.${index}.unitPrice`)
                          }}
                          className={cn(
                            'w-full bg-background',
                            priceError ? 'border-red-500' : '',
                          )}
                          placeholder='Precio'
                          disabled={disabled}
                        />
                      )}
                    />

                    {priceError && (
                      <p className='text-red-500 text-xs italic mt-1'>
                        {priceError}
                      </p>
                    )}
                  </div>

                  <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    className='w-9 h-9 mt-6'
                    onClick={() => remove(index)}
                    disabled={disabled}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='py-4 text-center text-sm text-muted-foreground border rounded-md'>
          No hay items agregados
        </div>
      )}

      {error && typeof error === 'string' && (
        <p className='text-red-500 text-xs italic'>{error}</p>
      )}
    </div>
  )
}

export default RHFAccumulativeItemsArray
