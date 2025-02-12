import { DataTable } from '@/components/table/data-table'
import { productsColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { IProductWithCategory } from '../../models/product'
import { useProductStore } from '../../context/use-product-store'
import { cn } from '@/common/lib/utils'

const ProductsView = ({
  products,
}: {
  products: IApiPaginatedRes<IProductWithCategory>
}) => {
  const isOpen = useProductStore((state) => state.isOpen)

  return (
    <div className={cn('grid gap-4 h-full', isOpen && 'grid-cols-5  -mr-4')}>
      <div className='col-span-3'>
        <DataTable
          data={products}
          columns={productsColumns}
          inputFilterKey='name'
          // filters={productFilters}
        />
      </div>

      {isOpen && (
        <div className='bg-primary-foreground w-full h-full col-span-2 -mt-6'></div>
      )}
    </div>
  )
}

export default ProductsView
