'use client'

import LoadingSkeleton from '@/common/components/layout/loading-skeleton'
import { getAllParams } from '@/common/utils/params'
import { useCategoriesFindAll } from '@/core/categories/hooks/use-categories-service'
import CategoriesView from '@/core/categories/presentation/views/categories-view'
import { useSearchParams } from 'next/navigation'

const CatgoriesPage = () => {
  const params = useSearchParams()

  const { data, isLoading } = useCategoriesFindAll(getAllParams(params))

  if (isLoading || !data) return <LoadingSkeleton />

  return <CategoriesView data={data} />
}

export default CatgoriesPage
