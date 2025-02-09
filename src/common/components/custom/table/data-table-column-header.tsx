import { HTMLAttributes } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQueryFromArray } from '@/common/utils/pagination'
import { cn } from '@/common/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui-components/dropdown-menu'
import { Button } from '@/ui-components/button'
import { ArrowDown, ArrowDownUp, ArrowUp } from 'lucide-react'

interface DataTableColumnHeaderProps extends HTMLAttributes<HTMLDivElement> {
  sort: string
  title: string
}

export function DataTableColumnHeader({
  sort,
  title,
  className,
}: DataTableColumnHeaderProps) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const order = searchParams.get('order')
  const sortParam = searchParams.get('sort')

  const handleSort = (order: string) => {
    const url = formUrlQueryFromArray({
      params: searchParams,
      values: [
        {
          key: 'sort',
          value: sort,
        },
        {
          key: 'order',
          value: order,
        },
      ],
    })

    replace(url, { scroll: false })
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-ml-3 h-8 data-[state=open]:bg-accent'
          >
            <span className='text-sm'>{title}</span>

            {order === 'desc' && sortParam === sort ? (
              <ArrowDown className='ml-2 h-4 w-4' />
            ) : order === 'asc' && sortParam === sort ? (
              <ArrowUp className='ml-2 h-4 w-4' />
            ) : (
              <ArrowDownUp className='ml-2 h-4 w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='start'>
          <DropdownMenuItem
            onClick={() => handleSort('asc')}
            className='cursor-pointer'
          >
            <ArrowUp className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => handleSort('desc')}
            className='cursor-pointer'
          >
            <ArrowDownUp className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
