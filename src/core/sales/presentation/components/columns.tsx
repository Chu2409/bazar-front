'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Sale } from '../../models/res/sale'
import { formatMoney } from '@/common/utils/money-formatter'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'
import { useSaleStore } from '../../context/use-sale-store'
import { formatDate } from '@/common/utils/date-formatter'
import { Badge } from '@/ui-components/badge'
import { getIdentificationTypeLabel } from '@/core/people/models/res/identification-type'

export const salesColumns: ColumnDef<Sale>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'dateTime',
    header: 'Fecha',
    cell: ({ row }) => formatDate(row.original.dateTime),
  },

  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => formatMoney(row.original.total),
  },
  {
    accessorKey: 'customer',
    header: 'Cliente',
    cell: ({ row }) => {
      const person = row.original.customer.person
      return `${person.firstName} ${person.firstSurname}`
    },
  },
  {
    accessorKey: 'identifications',
    header: 'Identificaciones',
    cell: ({ row }) => {
      const person = row.original.customer.person
      return (
        <div className='flex flex-col gap-1.5 justify-center'>
          {person.identifications.map((identification) => {
            const type = getIdentificationTypeLabel(identification.type)

            return (
              <div
                key={identification.id}
                className='flex items-center gap-1.5 text-sm'
              >
                <span>{identification.value}</span>

                <Badge
                  variant='outline'
                  className='px-1.5 bg-gray-300 text-gray-800'
                  style={{
                    fontSize: '0.7rem',
                  }}
                >
                  {type}
                </Badge>
              </div>
            )
          })}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const onOpen = useSaleStore.getState().onOpen

      const toggleStatus = async () => {
        return true
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
