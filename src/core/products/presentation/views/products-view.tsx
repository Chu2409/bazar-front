import { DataTable } from '@/components/table/data-table'
import { productsColumns } from '../components/columns'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { IProductWithCategory } from '../../models/product'
import { useProductStore } from '../../context/use-product-store'
import { cn } from '@/common/lib/utils'
import { X } from 'lucide-react'
import { Button } from '@/ui-components/button'
import { ProductForm } from '../components/product-form'

const ProductsView = ({
  products,
}: {
  products: IApiPaginatedRes<IProductWithCategory>
}) => {
  const isOpen = useProductStore((state) => state.isOpen)
  const onClose = useProductStore((state) => state.onClose)

  return (
    <div
      className={cn(
        'grid gap-x-4 gap-y-6 h-full max-h-full',
        isOpen && 'grid-cols-7 min-[1000px]:-mr-4 max-[1000px]:grid-cols-1',
      )}
    >
      <div className='col-span-4 max-[1000px]:col-span-1 max-[1000px]:order-1 mt-6 pb-10'>
        <DataTable
          data={products}
          columns={productsColumns}
          inputFilterKey='name'
          // filters={productFilters}
        />
      </div>

      {isOpen && (
        <div className='bg-primary-foreground w-full col-span-3  relative rounded-tl-xl rounded-bl-xl p-4 border-l shadow-xl flex flex-col gap-4 max-[1000px]:col-span-1 max-[1000px]:shadow-md max-[1000px]:rounded-xl max-[1000px]:mt-6'>
          <Button
            className='absolute top-0 right-0 bg-foreground p-2 rounded-none rounded-es-2xl max-[1000px]:rounded-tr-xl'
            onClick={onClose}
          >
            <X className='h-6 w-6 text-white' />
          </Button>

          <p className='text-black text-center pb-4'>Detalles del producto</p>

          <ProductForm />
        </div>
      )}
    </div>
  )
}

export default ProductsView
