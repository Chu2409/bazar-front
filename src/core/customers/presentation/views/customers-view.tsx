import { DataTable } from '@/components/table/data-table'
import { customersColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { useCustomerStore } from '../../context/use-customer-store'
import { CustomerForm } from '../components/customer-form'
import { CornerButton } from '@/components/corner-button'
import { DetailsContainer } from '@/common/components/layout/details-container'
import { MainContainer } from '@/common/components/layout/main-container'
import { DataContainer } from '@/common/components/layout/data-container'
import { Customer } from '../../models/res/customer'

const CustomersView = ({ data }: { data: IApiPaginatedRes<Customer> }) => {
  const isOpen = useCustomerStore((state) => state.isOpen)
  const onClose = useCustomerStore((state) => state.onClose)
  const onOpen = useCustomerStore((state) => state.onOpen)

  return (
    <>
      <CornerButton title='Agregar cliente' onClick={() => onOpen()} />

      <MainContainer isOpen={isOpen}>
        <DataContainer>
          <DataTable
            data={data}
            columns={customersColumns}
            inputFilterKey='identifications'
          />
        </DataContainer>

        {isOpen && (
          <DetailsContainer title='Detalles del cliente' onClose={onClose}>
            <CustomerForm />
          </DetailsContainer>
        )}
      </MainContainer>
    </>
  )
}

export default CustomersView
