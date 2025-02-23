import { DataTable } from '@/components/table/data-table'
import { productsColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { IProductWithCategory } from '../../models/product'
import { useProductStore } from '../../context/use-product-store'
import { ProductForm } from '../components/product-form'
import { CornerButton } from '@/components/corner-button'
import { DetailsContainer } from '@/common/components/layout/details-container'
import { MainContainer } from '@/common/components/layout/main-container'
import { DataContainer } from '@/common/components/layout/data-container'
import { useProductsFilters } from '../../hooks/use-products-filters'

const ProductsView = ({
  products,
}: {
  products: IApiPaginatedRes<IProductWithCategory>
}) => {
  const isOpen = useProductStore((state) => state.isOpen)
  const onClose = useProductStore((state) => state.onClose)
  const onOpen = useProductStore((state) => state.onOpen)

  const filters = useProductsFilters()

  return (
    <>
      <CornerButton title='Agregar producto' onClick={() => onOpen()} />

      <MainContainer isOpen={isOpen}>
        <DataContainer>
          <DataTable
            data={products}
            columns={productsColumns}
            inputFilterKey='name'
            filters={filters}
          />
        </DataContainer>

        {isOpen && (
          <DetailsContainer onClose={onClose}>
            <ProductForm />
          </DetailsContainer>
        )}
      </MainContainer>
    </>
  )
}

export default ProductsView
