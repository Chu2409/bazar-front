'use client'

import { useProductsFindAll } from '@/core/products/hooks/use-products-service'
import ProductsView from '@/core/products/presentation/views/products-view'
import { Suspense } from 'react'

const ProductsPage = () => {
  const { data, isLoading } = useProductsFindAll()

  if (isLoading) return <div>Loading...</div>

  return (
    <Suspense>
      <ProductsView products={data!} />
    </Suspense>
  )
}

export default ProductsPage
