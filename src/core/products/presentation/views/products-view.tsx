import { DataTable } from '@/components/table/data-table'
import { productsColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { IProduct } from '../../models/product'

const ProductsView = ({
  products,
}: {
  products: IApiPaginatedRes<IProduct>
}) => {
  return (
    <DataTable
      data={products}
      columns={productsColumns}
      inputFilterKey='name'
      // filters={productFilters}
    />
  )
}

export default ProductsView
