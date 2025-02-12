'use client'

import LoadingSkeleton from '@/common/components/layout/loading-skeleton'
import { useProductsFindAll } from '@/core/products/hooks/use-products-service'
import ProductsView from '@/core/products/presentation/views/products-view'

const ProductsPage = () => {
  const { data, isLoading } = useProductsFindAll()

  if (isLoading || !data) return <LoadingSkeleton />

  return <ProductsView products={data} />
}

export default ProductsPage
