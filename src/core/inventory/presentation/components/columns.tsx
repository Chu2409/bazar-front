/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FlagIndicator } from '@/components/flag-indicator'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'
import { useInventoryStore } from '../../context/use-inventory-store'
import { InventoryWithProductSupplier } from '../../models/res/inventory'
import { formatMoney } from '@/common/utils/money-formatter'
import { useInventoryDelete } from '../../hooks/use-inventory-service'

export const inventoryColumns: ColumnDef<InventoryWithProductSupplier>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'product',
    header: 'Producto',
    cell: ({ row }) => row.original.product.name,
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.product.active && <FlagIndicator />,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
  {
    accessorKey: 'retailPrice',
    header: 'Precio/Menor',
    cell: ({ row }) => formatMoney(row.original.product.retailPrice),
  },
  {
    accessorKey: 'wholesalePrice',
    header: 'Precio/Mayor',
    cell: ({ row }) => formatMoney(row.original.product.wholesalePrice),
  },
  {
    accessorKey: 'unitCost',
    header: 'Costo/Unidad',
    cell: ({ row }) => formatMoney(row.original.unitCost),
  },
  {
    accessorKey: 'supplier',
    header: 'Proveedor',
    cell: ({ row }) => row.original.supplier.name,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const onOpen = useInventoryStore.getState().onOpen

      const { mutateAsync } = useInventoryDelete(row.original.id)

      const onDelete = async () => {
        const status = await mutateAsync()
        return status
      }

      return (
        <DataTableRowActions
          onDelete={onDelete}
          onEdit={() => onOpen(row.original)}
        />
      )
    },
  },
]
