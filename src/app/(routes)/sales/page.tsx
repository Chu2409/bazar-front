'use client'

import LoadingSkeleton from '@/common/components/layout/loading-skeleton'
import { getAllParams } from '@/common/utils/params'
import { useFindAllSales } from '@/core/sales/hooks/use-sales-service'
import SalesView from '@/core/sales/presentation/views/sales-view'
import { useSearchParams } from 'next/navigation'

const SalesPage = () => {
  const params = useSearchParams()

  const { data, isLoading } = useFindAllSales(getAllParams(params))

  if (isLoading || !data) return <LoadingSkeleton />

  return <SalesView data={data} />
}

export default SalesPage
