'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IProduct } from '../../models/product'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { FlagIndicator } from '@/components/flag-indicator'

export const productsColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'name',
    meta: 'Nombre',
    header: () => <DataTableColumnHeader title='Nombre' sort='name' />,
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <FlagIndicator />,
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     // eslint-disable-next-line react-hooks/rules-of-hooks
  //     const onOpen = useProductModal((state) => state.onOpen)

  //     const toggleStatus = async (id: number, status: boolean) => {
  //       const { data: deleted } = await toggleProductStatus(id, status)

  //       return deleted
  //     }

  //     return (
  //       <DataTableRowActions
  //         id={row.original.id}
  //         status={row.original.active}
  //         toggleStatus={toggleStatus}
  //         onEdit={() => onOpen(row.original)}
  //       />
  //     )
  //   },
  // },
]
