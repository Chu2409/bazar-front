'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { DataTableToolbar } from './data-table-toolbar'
import { DataTablePagination } from './data-table-pagination'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui-components/table'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { ITableFilter } from '@/common/types/filters'
import { useEffect, ReactNode } from 'react'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: IApiPaginatedRes<TData>
  inputFilterKey?: string
  filters?: ITableFilter[]
  enableViewOptions?: boolean
  enableStatusFilter?: boolean
  // Nueva prop para personalizar el toolbar
  customToolbar?:
    | ReactNode
    | ((props: {
        table: ReturnType<typeof useReactTable>
        filters?: ITableFilter[]
        inputFilterKey?: string
        enableViewOptions?: boolean
        enableStatusFilter?: boolean
      }) => ReactNode)
}

export function DataTable<TData, TValue>({
  columns,
  data: { records, ...metadata },
  inputFilterKey,
  filters,
  enableViewOptions = true,
  enableStatusFilter = true,
  customToolbar, // Añadimos la nueva prop
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  useEffect(() => {
    table.setPageSize(metadata.limit)
  }, [metadata.limit, table])

  // Renderizado condicional del toolbar
  const renderToolbar = () => {
    // Si se proporciona un customToolbar
    if (customToolbar) {
      // Si es una función, llamarla con los props necesarios
      if (typeof customToolbar === 'function') {
        return customToolbar({
          // @ts-expect-error table no tiene un tipo definido
          table,
          filters,
          inputFilterKey,
          enableViewOptions,
          enableStatusFilter,
        })
      }
      // Si es un ReactNode, renderizarlo directamente
      return customToolbar
    }

    // Si no se proporciona customToolbar, usar el toolbar predeterminado
    return (
      <DataTableToolbar
        table={table}
        filters={filters}
        inputFilterKey={inputFilterKey}
        enableViewOptions={enableViewOptions}
        enableStatusFilter={enableStatusFilter}
      />
    )
  }

  return (
    <div className='space-y-4'>
      {renderToolbar()}

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No se encontraron resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination metadata={metadata} />
    </div>
  )
}
