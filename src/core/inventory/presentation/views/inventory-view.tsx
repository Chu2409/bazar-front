import { DataTable } from '@/components/table/data-table'
import { inventoryColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { useInventoryStore } from '../../context/use-inventory-store'
import { InventoryForm } from '../components/inventory-form'
import { CornerButton } from '@/components/corner-button'
import { DetailsContainer } from '@/common/components/layout/details-container'
import { MainContainer } from '@/common/components/layout/main-container'
import { DataContainer } from '@/common/components/layout/data-container'
import { InventoryWithProductSupplier } from '../../models/res/inventory'

const InventoryView = ({
  data,
}: {
  data: IApiPaginatedRes<InventoryWithProductSupplier>
}) => {
  const isOpen = useInventoryStore((state) => state.isOpen)
  const onClose = useInventoryStore((state) => state.onClose)
  const onOpen = useInventoryStore((state) => state.onOpen)

  return (
    <>
      <CornerButton title='Agregar inventario' onClick={() => onOpen()} />

      <MainContainer isOpen={isOpen}>
        <DataContainer>
          <DataTable
            data={data}
            columns={inventoryColumns}
            inputFilterKey='product'
          />
        </DataContainer>

        {isOpen && (
          <DetailsContainer onClose={onClose}>
            <InventoryForm />
          </DetailsContainer>
        )}
      </MainContainer>
    </>
  )
}

export default InventoryView
