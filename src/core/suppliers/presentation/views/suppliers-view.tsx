import { DataTable } from '@/components/table/data-table'
import { suppliersColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { ISupplier } from '../../models/supplier'
import { useSupplierStore } from '../../context/use-supplier-store'
import { SupplierForm } from '../components/supplier-form'
import { CornerButton } from '@/components/corner-button'
import { DetailsContainer } from '@/common/components/layout/details-container'
import { MainContainer } from '@/common/components/layout/main-container'
import { DataContainer } from '@/common/components/layout/data-container'

const SuppliersView = ({ data }: { data: IApiPaginatedRes<ISupplier> }) => {
  const isOpen = useSupplierStore((state) => state.isOpen)
  const onClose = useSupplierStore((state) => state.onClose)
  const onOpen = useSupplierStore((state) => state.onOpen)

  return (
    <>
      <CornerButton title='Agregar proveedor' onClick={() => onOpen()} />

      <MainContainer isOpen={isOpen}>
        <DataContainer>
          <DataTable
            data={data}
            columns={suppliersColumns}
            inputFilterKey='name'
          />
        </DataContainer>

        {isOpen && (
          <DetailsContainer onClose={onClose}>
            <SupplierForm />
          </DetailsContainer>
        )}
      </MainContainer>
    </>
  )
}

export default SuppliersView
