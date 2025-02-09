'use client'

import { Table } from '@tanstack/react-table'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useCallback, useState } from 'react'
import debounce from 'just-debounce-it'
import { ITableFilter } from '@/common/types/filters'
import { formUrlQuery } from '@/common/utils/pagination'
import { Input } from '@/ui-components/input'
import { Button } from '@/ui-components/button'
import { X } from 'lucide-react'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableStatusFilter } from './data-table-status-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters?: ITableFilter[]
  inputFilterKey?: string
  enableViewOptions: boolean
  enableStatusFilter: boolean
}

export function DataTableToolbar<TData>({
  table,
  filters,
  inputFilterKey,
  enableViewOptions,
  enableStatusFilter,
}: DataTableToolbarProps<TData>) {
  const inputColumn = inputFilterKey ? table.getColumn(inputFilterKey) : null

  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathName = usePathname()

  const [inputValue, setInputValue] = useState<string>(
    () => searchParams.get('search') || '',
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setInputValue(value)
    applyFilter(value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyFilter = useCallback(
    debounce((value: string) => {
      const url = formUrlQuery({
        params: searchParams,
        key: 'search',
        value,
      })

      replace(url, { scroll: false })
    }, 500),
    [],
  )

  const handleClearFilters = () => {
    setInputValue('')
    replace(pathName, { scroll: false })
  }

  return (
    <div className='flex items-center justify-between gap-2 flex-wrap'>
      {(inputFilterKey || (filters && filters.length > 0)) && (
        <div className='flex items-center gap-2 flex-wrap'>
          {inputColumn && (
            <Input
              placeholder={`Filtrar por ${((inputColumn.columnDef.meta as string) || (inputColumn.columnDef.header as string)).toLowerCase()}...`}
              onChange={handleChange}
              value={inputValue}
              className='h-8 w-[200px] lg:w-[250px] '
            />
          )}

          {filters?.map((filter) => {
            return (
              <DataTableFacetedFilter
                key={filter.key}
                title={
                  (table.getColumn(filter.key)?.columnDef.meta as string) ||
                  (table.getColumn(filter.key)?.columnDef.header as string)
                }
                getById={filter.getById}
                paramKey={filter.key}
                options={filter.values}
              />
            )
          })}

          {enableStatusFilter && table.getColumn('status') && (
            <DataTableStatusFilter />
          )}

          {searchParams.size > 0 && (
            <Button
              variant='ghost'
              onClick={() => handleClearFilters()}
              className='h-8 px-2 lg:px-3 bg-gray-200 hover:bg-gray-300 text-black'
            >
              Limpiar filtros
              <X className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      )}

      {enableViewOptions && table.getAllColumns().length > 2 && (
        <DataTableViewOptions table={table} />
      )}
    </div>
  )
}
