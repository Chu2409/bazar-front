import { useState, useCallback } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import debounce from 'just-debounce-it'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui-components/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/ui-components/command'
import { Input } from '@/ui-components/input'
import { Button } from '@/ui-components/button'
import { cn } from '@/common/lib/utils'
import { IOption } from '@/common/types/filters'

interface Params {
  value?: number
  onChange: (value?: number) => void
  options: IOption[]
  onSearchChange: (value: string) => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function SearchableSelector({
  value,
  onChange,
  disabled = false,
  isLoading = false,
  onSearchChange,
  options,
  placeholder = 'Seleccione una opción',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'No hay resultados disponibles',
}: Params) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')

  const selectedOption = options.find((option) => option.id === value)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearchChange(value)
    }, 600),
    [onSearchChange],
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setInputValue(value)
      debouncedSearch(value)
    },
    [debouncedSearch],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'w-full justify-between text-left font-normal',
            !selectedOption && 'text-muted-foreground',
          )}
        >
          {selectedOption?.label || placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='p-0 -mt-1 w-full min-w-[250px]' align='start'>
        <Command className='shadow-md'>
          <Input
            placeholder={searchPlaceholder}
            className='mb-1'
            onChange={handleChange}
            value={inputValue}
          />

          <CommandList>
            {isLoading ? (
              <div className='py-6 text-center text-sm text-muted-foreground'>
                Cargando...
              </div>
            ) : options.length === 0 ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={`${option.id}`}
                    onSelect={() => {
                      onChange(option.id === value ? undefined : option.id)
                      setOpen(false)
                    }}
                    className='cursor-pointer'
                  >
                    {option.label}

                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        value === option.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
