import { cn } from '@/common/lib/utils'
import { getError } from '@/common/utils/forms'
import {
  getIdentificationTypeLabel,
  IdentificationType,
} from '@/core/identifications/models/res/identification-type'

import { Button } from '@/ui-components/button'
import { Checkbox } from '@/ui-components/checkbox'
import { Input } from '@/ui-components/input'
import { Label } from '@/ui-components/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui-components/select'
import { Plus, X } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'

interface Props {
  name: string
  label: string
  className?: string
  disabled?: boolean
  buttonLabel?: string
}

const RHFIdentificationArray = ({
  name,
  label,
  disabled,
  buttonLabel,
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

  const handleAppend = () => {
    append(
      {
        type: '',
        value: '',
        active: true,
      },
      { shouldFocus: false },
    )
  }

  const handleRemove = (index: number) => {
    remove(index)
  }

  useEffect(() => {
    if (fields.length === 0) {
      handleAppend()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length])

  return (
    <div className='flex flex-col gap-3'>
      <Label className={error ? 'text-red-500' : ''}>
        {label} <span className='text-red-500'> *</span>
      </Label>

      <div className='space-y-3'>
        {fields.map((field, index) => {
          const typeErrorPath = `${name}.${index}.type`
          const valueErrorPath = `${name}.${index}.value`

          const typeError = getError(typeErrorPath, errors)
          const valueError = getError(valueErrorPath, errors)

          return (
            <div key={field.id} className='flex flex-col gap-2'>
              <div className='flex items-start gap-2'>
                {/* Select para el tipo de documento */}
                <div className='w-1/3'>
                  <Controller
                    control={control}
                    name={`${name}.${index}.type`}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Select
                        value={value}
                        onValueChange={(newValue) => {
                          onChange(newValue)
                          if (newValue) {
                            trigger(`${name}.${index}.type`)
                          }
                        }}
                        onOpenChange={(open) => {
                          if (!open && value) {
                            onBlur()
                            trigger(`${name}.${index}.type`)
                          }
                        }}
                        disabled={disabled}
                      >
                        <SelectTrigger
                          className={cn(
                            'w-full bg-background',
                            typeError ? 'border-red-500' : '',
                          )}
                        >
                          <SelectValue placeholder='Tipo' />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(IdentificationType).map((type) => (
                            <SelectItem key={type} value={type}>
                              {getIdentificationTypeLabel(type)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {typeError && (
                    <p className='text-red-500 text-xs italic mt-1'>
                      {typeError}
                    </p>
                  )}
                </div>

                {/* Input para el número de documento */}
                <div className='flex-1'>
                  <Controller
                    control={control}
                    name={`${name}.${index}.value`}
                    render={({ field: { onChange, value, onBlur } }) => (
                      <Input
                        value={value || ''}
                        onChange={(e) => {
                          onChange(e.target.value)
                        }}
                        onBlur={() => {
                          onBlur()
                          if (value) {
                            trigger(`${name}.${index}.value`)
                          }
                        }}
                        className={cn(
                          'w-full bg-background',
                          valueError ? 'border-red-500' : '',
                        )}
                        placeholder='Número de documento'
                        disabled={disabled}
                      />
                    )}
                  />
                  {valueError && (
                    <p className='text-red-500 text-xs italic mt-1'>
                      {valueError}
                    </p>
                  )}
                </div>

                {/* Checkbox para el estado activo */}
                <div className='flex items-center space-x-2 pt-2'>
                  <Controller
                    control={control}
                    name={`${name}.${index}.active`}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        checked={value}
                        defaultChecked={true}
                        onCheckedChange={onChange}
                        disabled={disabled}
                        id={`${name}-${index}-active`}
                      />
                    )}
                  />
                  <Label
                    htmlFor={`${name}-${index}-active`}
                    className='text-xs'
                  >
                    Activo
                  </Label>
                </div>

                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  className='w-9 h-9'
                  onClick={() => handleRemove(index)}
                  disabled={disabled}
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      <Button
        type='button'
        variant='outline'
        size='sm'
        onClick={handleAppend}
        disabled={disabled}
      >
        <Plus className='h-4 w-4 mr-2' />
        {buttonLabel || 'Agregar'}
      </Button>

      {error && typeof error === 'string' && (
        <p className='text-red-500 text-xs italic'>{error}</p>
      )}
    </div>
  )
}

export default RHFIdentificationArray
