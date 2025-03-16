import { useFieldArray, useFormContext, Controller } from 'react-hook-form'
import { X, Plus } from 'lucide-react'
import { Label } from '@/ui-components/label'
import { Input } from '@/ui-components/input'
import { cn } from '@/common/lib/utils'
import { Button } from '@/ui-components/button'
import { getError } from '@/common/utils/forms'

interface Props {
  name: string
  label: string
  className?: string
  disabled?: boolean
  placeholder?: string
  buttonLabel?: string
  required?: boolean
}

const RHFArrayMultiInput = ({
  name,
  label,
  className,
  disabled,
  placeholder,
  buttonLabel,
  required = false,
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

  const handleAppend = async () => {
    append({ value: '' }, { shouldFocus: false })
  }

  const handleRemove = (index: number) => {
    remove(index)
    trigger()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Label htmlFor={`${name}-0`} className={error ? 'text-red-500' : ''}>
        {label}
        {required && <span className='text-red-500'> *</span>}
      </Label>

      <div className='space-y-2'>
        {fields.map((field, index) => {
          const itemErrorPath = `${name}.${index}.value`
          const itemError = getError(itemErrorPath, errors)

          return (
            <div key={field.id} className='flex space-x-2'>
              <div className='relative flex-1'>
                <Controller
                  control={control}
                  name={`${name}.${index}.value`}
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Input
                      id={`${name}-${index}`}
                      onChange={(e) => {
                        const inputValue = e.target.value
                        if (inputValue === '') {
                          onChange(undefined)
                        } else {
                          onChange(inputValue)
                        }
                      }}
                      onBlur={() => {
                        onBlur()
                        if (value) {
                          trigger(`${name}.${index}.value`)
                        }
                      }}
                      value={value ?? ''}
                      className={cn(
                        'bg-background',
                        className,
                        itemError && 'border-red-500',
                      )}
                      disabled={disabled}
                      placeholder={placeholder}
                    />
                  )}
                />

                {itemError && (
                  <p className='text-red-500 text-xs italic mt-1'>{`${itemError}`}</p>
                )}
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

export default RHFArrayMultiInput
