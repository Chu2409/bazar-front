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
        'grid gap-4 h-full max-h-full',
        isOpen && 'grid-cols-5  -mr-4',
      )}
    >
      <div className='col-span-3 pt-6'>
        <DataTable
          data={products}
          columns={productsColumns}
          inputFilterKey='name'
          // filters={productFilters}
        />
      </div>

      {isOpen && (
        <div className='bg-primary-foreground w-full col-span-2  relative rounded-tl-xl rounded-bl-xl h-full grid p-4'>
          <Button
            className='absolute top-0 right-0 bg-foreground p-2 rounded-none rounded-es-2xl'
            onClick={onClose}
          >
            <X className='h-6 w-6 text-white' />
          </Button>

          <p className='text-black text-center'>Detalles del producto</p>

          <ProductForm />
        </div>
      )}
    </div>
  )
}

export default ProductsView
