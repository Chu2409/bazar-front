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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: IApiPaginatedRes<TData>
  inputFilterKey?: string
  filters?: ITableFilter[]
  enableViewOptions?: boolean
  enableStatusFilter?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data: { records, ...metadata },
  inputFilterKey,
  filters,
  enableViewOptions = true,
  enableStatusFilter = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: records,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // useEffect(() => {
  //   table.setPageSize(metadata.limit)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [metadata])

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        filters={filters}
        inputFilterKey={inputFilterKey}
        enableViewOptions={enableViewOptions}
        enableStatusFilter={enableStatusFilter}
      />

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
