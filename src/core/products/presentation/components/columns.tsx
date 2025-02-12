/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IProductWithCategory } from '../../models/product'
import { FlagIndicator } from '@/components/flag-indicator'
import { formatMoney } from '@/common/utils/money-formatter'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'
import { useProductStore } from '../../context/use-product-store'
import { useToggleProductStatus } from '../../hooks/use-products-service'

export const productsColumns: ColumnDef<IProductWithCategory>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <FlagIndicator />,
  },
  {
    accessorKey: 'retailPrice',
    header: 'Precio/Menor',
    cell: ({ row }) => formatMoney(row.original.retailPrice),
  },
  {
    accessorKey: 'wholesalePrice',
    header: 'Precio/Mayor',
    cell: ({ row }) => formatMoney(row.original.wholesalePrice),
  },
  {
    accessorKey: 'wholesaleQty',
    header: 'Cant. Min. Mayor',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const onOpen = useProductStore.getState().onOpen
      const { mutateAsync } = useToggleProductStatus(row.original.id)

      const toggleStatus = async () => {
        const status = await mutateAsync()
        return status
      }

      return (
        <DataTableRowActions
          status={row.original.active}
          toggleStatus={toggleStatus}
          onEdit={() => onOpen(row.original)}
        />
      )
    },
  },
]
