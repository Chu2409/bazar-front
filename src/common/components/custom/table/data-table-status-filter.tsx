'use client'

import { getStatusById, STATUSES } from '@/constants/statuses'
import { cn } from '@/common/lib/utils'
import {
  formUrlArrayQuery,
  removeValueFromArrayQuery,
} from '@/common/utils/pagination'
import { Badge } from '@/ui-components/badge'
import { Button } from '@/ui-components/button'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/ui-components/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui-components/popover'
import { Separator } from '@/ui-components/separator'
import { CheckIcon, CirclePlus } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

export const DataTableStatusFilter = () => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const status = searchParams.getAll('status')

  const selected = status
    .map((status) => getStatusById(Number(status))?.id)
    .filter((status) => status != null)

  const handleChange = (value: number, isSelected: boolean) => {
    let url
    if (isSelected)
      url = removeValueFromArrayQuery({
        params: searchParams,
        keyToRemove: 'status',
        valueToRemove: value.toString(),
      })
    else
      url = formUrlArrayQuery({
        params: searchParams,
        key: 'status',
        value: value.toString(),
      })

    replace(url, { scroll: false })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <CirclePlus className='mr-2 h-4 w-4' />
          Estado
          {selected.length > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />

              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selected.length}
              </Badge>

              <div className='hidden space-x-1 lg:flex'>
                {Object.values(STATUSES)
                  .filter((option) => selected.includes(option.id))
                  .map((option) => (
                    <Badge
                      variant='secondary'
                      key={option.id}
                      className='rounded-sm px-1 font-normal'
                    >
                      {option.label}
                    </Badge>
                  ))}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-[180px] p-0' align='start'>
        <Command>
          <CommandList>
            <CommandGroup>
              {Object.values(STATUSES).map((option) => {
                const isSelected = selected.includes(option.id)

                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => handleChange(option.id, isSelected)}
                    className='cursor-pointer capitalize'
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <CheckIcon className={cn('h-4 w-4')} />
                    </div>

                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
