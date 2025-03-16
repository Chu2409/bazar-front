'use client'

import { ColumnDef, Row } from '@tanstack/react-table'
import { FlagIndicator } from '@/components/flag-indicator'
import { DataTableRowActions } from '@/components/table/data-table-row-actions'
import { useCustomerStore } from '../../context/use-customer-store'
import { useToggleCustomerStatus } from '../../hooks/use-customers-service'
import { Customer } from '../../models/res/customer'
import { Badge } from '@/ui-components/badge'
import { getIdentificationTypeLabel } from '@/core/identifications/models/res/identification-type'

const ActionsCell = ({ row }: { row: Row<Customer> }) => {
  const onOpen = useCustomerStore((state) => state.onOpen)
  const { mutateAsync } = useToggleCustomerStatus(row.original.id)

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
}

export const customersColumns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'id',
    meta: 'Id',
    header: () => <div className='text-center'>ID</div>,
    cell: ({ row }) => <div className='text-center'>{row.original.id}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const person = row.original.person

      return `${person.firstName} ${person.firstSurname}`
    },
  },
  {
    accessorKey: 'status',
    meta: 'Estado',
    header: '',
    cell: ({ row }) => !row.original.active && <FlagIndicator />,
  },
  {
    accessorKey: 'identifications',
    header: 'Identificaciones',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1.5 justify-center'>
        {row.original.person.identifications.map((identification) => {
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
    ),
  },
  {
    accessorKey: 'email',
    header: 'Correo',
    cell: ({ row }) => row.original.person.email,
  },
  {
    accessorKey: 'contact',
    header: 'Contacto',
    cell: ({ row }) => (
      <div className='flex flex-col gap-1.5 justify-center'>
        {row.original.person.phoneNumbers.map((phoneNumber) => {
          return (
            <div
              key={phoneNumber}
              className='flex items-center gap-1.5 text-sm'
            >
              {phoneNumber}
            </div>
          )
        })}
      </div>
    ),
  },
  {
    accessorKey: 'address',
    header: 'Dirección',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]
