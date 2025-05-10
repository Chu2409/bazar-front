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
import { InventoryWithProductSupplier } from '@/core/inventory/models/res/inventory'
import { useGetBySearchInventory } from '@/core/inventory/hooks/use-inventory-service'
import { Badge } from '@/ui-components/badge'

interface Props {
  onChange: (value: InventoryWithProductSupplier) => void
  disabled?: boolean
}

export function ItemsSelector({ onChange, disabled = false }: Props) {
  const [open, setOpen] = useState(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')

  const { data, isLoading } = useGetBySearchInventory({
    search: searchValue,
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchValue(value)
    }, 600),
    [setSearchValue],
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
            ) : data?.length === 0 ? (
              <CommandEmpty>No se encontraron productos</CommandEmpty>
            ) : (
              <CommandGroup>
                {data?.map((option) => (
                  <CommandItem
                    key={`${option.id}`}
                    onSelect={() => {
                      onChange(option)
                      setOpen(false)
                    }}
                    className='cursor-pointer flex gap-4'
                  >
                    {option.product.name}
                    <Badge className='p-0.5 text-[10px] '>
                      {option.supplier.name}
                    </Badge>
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
