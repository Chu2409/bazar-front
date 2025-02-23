'use client'

import LoadingSkeleton from '@/common/components/layout/loading-skeleton'
import { getAllParams } from '@/common/utils/params'
import { useProductsFindAll } from '@/core/products/hooks/use-products-service'
import ProductsView from '@/core/products/presentation/views/products-view'
import { useSearchParams } from 'next/navigation'

const ProductsPage = () => {
  const params = useSearchParams()

  const { data, isLoading } = useProductsFindAll(getAllParams(params))

  if (isLoading || !data) return <LoadingSkeleton />

  return <ProductsView products={data} />
}

export default ProductsPage
