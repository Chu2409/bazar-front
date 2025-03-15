import { DataTable } from '@/components/table/data-table'
import { salesColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { Sale } from '../../models/res/sale'
import { useSaleStore } from '../../context/use-sale-store'
import { SaleForm } from '../components/sale-form'
import { CornerButton } from '@/components/corner-button'
import { DataContainer } from '@/common/components/layout/data-container'
import { Button } from '@/ui-components/button'
import { X } from 'lucide-react'
import { cn } from '@/common/lib/utils'

const SalesView = ({ data }: { data: IApiPaginatedRes<Sale> }) => {
  const isOpen = useSaleStore((state) => state.isOpen)
  const onClose = useSaleStore((state) => state.onClose)
  const onOpen = useSaleStore((state) => state.onOpen)

  // const filters = useSalesFilters()

  return (
    <>
      <CornerButton title='Agregar venta' onClick={() => onOpen()} />

      <div className={cn(isOpen && 'grid-rows-2')}>
        <DataContainer>
          <DataTable
            data={data}
            columns={salesColumns}
            enableStatusFilter={false}
            inputFilterKey='customer'
            // filters={filters}
          />
        </DataContainer>

        {isOpen && (
          <div className='bg-primary-foreground relative rounded-md p-4 border shadow-xl flex flex-col gap-4'>
            <Button
              className='absolute top-0 right-0 bg-foreground p-2 rounded-none rounded-es-2xl max-[1000px]:rounded-tr-md'
              onClick={onClose}
            >
              <X className='h-6 w-6 text-white' />
            </Button>

            <p className='text-black text-center pb-4'>Detalles del producto</p>

            <SaleForm />
          </div>
        )}
      </div>
    </>
  )
}

export default SalesView
