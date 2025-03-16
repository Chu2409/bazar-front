'use client'

import { Table } from '@tanstack/react-table'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react'
import debounce from 'just-debounce-it'
import { X } from 'lucide-react'

import { DataTableFacetedFilter } from './data-table-faceted-filter'
import { DataTableViewOptions } from './data-table-view-options'
import { DataTableStatusFilter } from './data-table-status-filter'
import { Input } from '@/ui-components/input'
import { Button } from '@/ui-components/button'
import { ITableFilter } from '@/common/types/filters'
import {
  formUrlQuery,
  removeValueFromQuery,
  removeAllExceptKeysFromQuery,
} from '@/common/utils/pagination'

// Tipo mejorado para metadata de columnas
interface ColumnMeta {
  title?: string
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filters?: ITableFilter[]
  inputFilterKey?: string
  enableViewOptions: boolean
  enableStatusFilter: boolean
  // Añadimos i18n básico
  texts?: {
    filterBy?: string
    clearFilters?: string
  }
}

// Componentes internos memoizados
const MemoizedFacetedFilter = React.memo(DataTableFacetedFilter)
const MemoizedStatusFilter = React.memo(DataTableStatusFilter)
const MemoizedViewOptions = React.memo(DataTableViewOptions)

export function DataTableToolbar<TData>({
  table,
  filters,
  inputFilterKey,
  enableViewOptions,
  enableStatusFilter,
  texts = {
    filterBy: 'Filtrar por',
    clearFilters: 'Limpiar filtros',
  },
}: DataTableToolbarProps<TData>) {
  const inputColumn = inputFilterKey ? table.getColumn(inputFilterKey) : null
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  // Estado para el input de búsqueda
  const [inputValue, setInputValue] = useState<string>(
    () => searchParams.get('search') || '',
  )

  // Aplicar filtro con debounce usando useCallback
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const applyFilter = useCallback(
    debounce((value: string) => {
      const url =
        value === ''
          ? removeValueFromQuery({ params: searchParams, key: 'search' })
          : formUrlQuery({ params: searchParams, key: 'search', value })

      replace(url, { scroll: false })
    }, 500),
    [replace, searchParams],
  )

  // Manejador de cambio optimizado
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setInputValue(value)
      applyFilter(value)
    },
    [applyFilter],
  )

  // Función para limpiar filtros
  const handleClearFilters = useCallback(() => {
    setInputValue('')
    const url = removeAllExceptKeysFromQuery({
      params: searchParams,
      keys: ['limit', 'page'],
    })
    replace(url, { scroll: false })
  }, [searchParams, replace])

  // Detectar filtros activos, memoizado
  const hasActiveFilters = useMemo((): boolean => {
    const ignoredParams = ['limit', 'page']
    return Array.from(searchParams.entries()).some(
      ([key]) => !ignoredParams.includes(key),
    )
  }, [searchParams])

  // Obtener el título de la columna de manera segura
  const getColumnTitle = useCallback(
    (key: string) => {
      const column = table.getColumn(key)
      if (!column) return key

      const meta = column.columnDef.meta as ColumnMeta | undefined
      return meta?.title || (column.columnDef.header as string) || key
    },
    [table],
  )

  // Obtener placeholder para el input de búsqueda
  const inputPlaceholder = useMemo(() => {
    if (!inputColumn) return ''
    const columnTitle = getColumnTitle(inputFilterKey as string)
    return `${texts.filterBy} ${columnTitle.toLowerCase()}...`
  }, [inputColumn, inputFilterKey, getColumnTitle, texts.filterBy])

  // Renderizado condicional para filtros
  const renderFilters = () => {
    if (!inputFilterKey && (!filters || filters.length === 0)) return null

    return (
      <div
        className='flex items-center gap-2 flex-wrap'
        role='search'
        aria-label='Filtros de tabla'
      >
        {inputColumn && (
          <Input
            placeholder={inputPlaceholder}
            onChange={handleChange}
            value={inputValue}
            className='h-8 w-[200px] lg:w-[250px]'
            aria-label='Filtro de búsqueda'
          />
        )}

        {filters?.map((filter) => (
          <MemoizedFacetedFilter
            key={filter.key}
            title={getColumnTitle(filter.key)}
            getById={filter.getById}
            paramKey={filter.key}
            options={filter.values}
          />
        ))}

        {enableStatusFilter && table.getColumn('status') && (
          <MemoizedStatusFilter />
        )}

        {hasActiveFilters && (
          <Button
            variant='ghost'
            onClick={handleClearFilters}
            className='h-8 px-2 lg:px-3 bg-gray-200 hover:bg-gray-300 text-black'
            aria-label={texts.clearFilters}
          >
            {texts.clearFilters}
            <X className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className='flex items-center justify-between gap-2 flex-wrap'>
      {renderFilters()}

      {enableViewOptions && table.getAllColumns().length > 2 && (
        // @ts-expect-error table prop
        <MemoizedViewOptions table={table} />
      )}
    </div>
  )
}
