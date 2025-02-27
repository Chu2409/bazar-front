/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { ColumnDef } from '@tanstack/react-table'
import { FlagIndicator } from '@/components/flag-indicator'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'
import { useCategoryStore } from '../../context/use-category-store'
import { useToggleCategoryStatus } from '../../hooks/use-categories-service'
import { ICategory } from '../../models/category'

export const categoriesColumns: ColumnDef<ICategory>[] = [
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
    id: 'actions',
    cell: ({ row }) => {
      const onOpen = useCategoryStore.getState().onOpen
      const { mutateAsync } = useToggleCategoryStatus(row.original.id)

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
