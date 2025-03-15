import { useState, useCallback } from 'react'
import { ChevronsUpDown } from 'lucide-react'
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
import { IInventoryWithProductSupplier } from '@/core/inventory/models/inventory'
import { useInventoryFindAll } from '@/core/inventory/hooks/use-inventory-service'

interface Props {
  onChange: (value: IInventoryWithProductSupplier) => void
  disabled?: boolean
}

const minSearchLength = 1

export function ItemsSelector({ onChange, disabled = false }: Props) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')

  const { data, isLoading } = useInventoryFindAll({
    search: searchValue,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputValue(value)
    debouncedSearch(value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value)
    }, 500),
    [],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-full justify-between text-left font-normal')}
        >
          Buscar y agregar items...
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='p-0 -mt-1 w-full min-w-[250px]' align='start'>
        <Command className='shadow-md'>
          <Input
            placeholder='Ingresa el nombre del producto'
            className='mb-1'
            onChange={handleChange}
            value={inputValue}
          />

          <CommandList>
            {isLoading ? (
              <div className='py-6 text-center text-sm text-muted-foreground'>
                Cargando...
              </div>
            ) : data?.records.length === 0 &&
              searchValue.length >= minSearchLength ? (
              <CommandEmpty>No se encontraron productos</CommandEmpty>
            ) : searchValue.length < minSearchLength ? (
              <div className='py-6 text-center text-sm text-muted-foreground'>
                Ingrese al menos {minSearchLength} caracteres para buscar
              </div>
            ) : (
              <CommandGroup>
                {data?.records.map((option) => (
                  <CommandItem
                    key={`${option.id}`}
                    onSelect={() => {
                      onChange(option)
                      setOpen(false)
                    }}
                    className='cursor-pointer'
                  >
                    {option.product.name}
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
