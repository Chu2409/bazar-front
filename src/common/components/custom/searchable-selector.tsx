/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from 'react'
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

interface SearchableSelectorProps {
  value?: IOption // Ahora manejamos directamente el ID
  onChange: (value?: IOption) => void // Callback recibe directamente el ID
  disabled?: boolean
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  fetchItems: (searchTerm: string) => Promise<any[]>
  mapToOption: (item: any) => IOption
  debounceTime?: number
  minSearchLength?: number
}

export function SearchableSelector({
  value,
  onChange,
  disabled = false,
  placeholder = 'Seleccione una opción',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'No hay resultados disponibles',
  fetchItems,
  mapToOption,
  debounceTime = 500,
  minSearchLength = 1,
}: SearchableSelectorProps) {
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState<IOption[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  // Encuentra la opción seleccionada actual basada en el ID
  const selectedOption = options.find((option) => option.id === value?.id)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputValue(value)
    debouncedSearch(value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value)
    }, debounceTime),
    [],
  )

  useEffect(() => {
    if (searchValue.length < minSearchLength) {
      setOptions([])
      return
    }

    const performSearch = async () => {
      setIsLoading(true)
      try {
        const results = await fetchItems(searchValue)
        // Mapear los items al formato IOption usando la función de mapeo proporcionada
        const mappedOptions = results.map(mapToOption)
        setOptions(mappedOptions)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setOptions([])
      } finally {
        setIsLoading(false)
      }
    }

    performSearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

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
            ) : options.length === 0 &&
              searchValue.length >= minSearchLength ? (
              <CommandEmpty>{emptyMessage}</CommandEmpty>
            ) : searchValue.length < minSearchLength ? (
              <div className='py-6 text-center text-sm text-muted-foreground'>
                Ingrese al menos {minSearchLength} caracteres para buscar
              </div>
            ) : (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={`${option.id}`}
                    onSelect={() => {
                      onChange(option.id === value?.id ? undefined : option)
                      setOpen(false)
                    }}
                    className='cursor-pointer'
                  >
                    {option.label}

                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        value?.id === option.id ? 'opacity-100' : 'opacity-0',
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
