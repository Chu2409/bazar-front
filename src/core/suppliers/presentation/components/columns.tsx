/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ISupplier } from '../../models/supplier'
import { FlagIndicator } from '@/components/flag-indicator'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'
import { useSupplierStore } from '../../context/use-supplier-store'
import { useToggleSupplierStatus } from '../../hooks/use-suppliers-service'

export const suppliersColumns: ColumnDef<ISupplier>[] = [
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
    accessorKey: 'address',
    header: 'Dirección',
  },
  {
    accessorKey: 'phone',
    header: 'Teléfono',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const onOpen = useSupplierStore.getState().onOpen
      const { mutateAsync } = useToggleSupplierStatus(row.original.id)

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
