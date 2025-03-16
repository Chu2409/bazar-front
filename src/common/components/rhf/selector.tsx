import { InputHTMLAttributes, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/ui-components/input'
import { Label } from '@/ui-components/label'
import { Button } from '@/ui-components/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui-components/popover'
import { cn } from '@/common/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/ui-components/command'
import { IOption } from '@/common/types/filters'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  options: IOption[]
  required?: boolean
  onSearchChange: (value: string) => void
}

const RHFSelector = ({
  name,
  label,
  onSearchChange,
  options,
  disabled,
  required = false,
}: Props) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext()

  const error = errors[name]?.message
  const currentValue = watch(name)

  const [title, setTitle] = useState<string | null>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const selectedOption = options.find((opt) => opt.id === currentValue)

    setTitle(selectedOption?.label || null)
  }, [currentValue, options])

  return (
    <div className='grid gap-2'>
      <Label htmlFor={name} className={error ? 'text-red-500' : ''}>
        {label}

        {required && <span className='text-red-500'> *</span>}
      </Label>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disabled}>
              <Button
                variant='outline'
                role='combobox'
                className={cn(
                  'w-full justify-between text-left font-normal bg-white',
                  !title && 'text-muted-foreground',
                )}
              >
                {title || 'Seleccione una opción'}
                <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className='p-0 -mt-1 w-[300px] sm:w-[250px] md:w-[280px] lg:w-[340px] xl:w-[400px]'
              align='start'
            >
              <Command className='shadow-md'>
                {onSearchChange && (
                  <Input
                    placeholder='Ingrese el nombre...'
                    className='mb-1'
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                )}

                <CommandList>
                  <CommandEmpty>No hay opciones disponibles</CommandEmpty>

                  <CommandGroup>
                    {options.map((opt) => (
                      <CommandItem
                        key={`${opt.id}`}
                        onSelect={() => {
                          onChange(opt.id === value ? '' : opt.id)
                          setOpen(false)
                        }}
                        className='cursor-pointer bg-white'
                      >
                        {opt.label}

                        {opt.id === value && (
                          <Check className='ml-auto h-4 w-4' />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )}
      />

      {error && <p className='text-red-500 text-xs italic'>{`${error}`}</p>}
    </div>
  )
}

export default RHFSelector
