'use client'

import LoadingSkeleton from '@/common/components/layout/loading-skeleton'
import { getAllParams } from '@/common/utils/params'
import { useSuppliersFindAll } from '@/core/suppliers/hooks/use-suppliers-service'
import SuppliersView from '@/core/suppliers/presentation/views/suppliers-view'
import { useSearchParams } from 'next/navigation'

const ProvidersPage = () => {
  const params = useSearchParams()

  const { data, isLoading } = useSuppliersFindAll(getAllParams(params))

  if (isLoading || !data) return <LoadingSkeleton />

  return <SuppliersView data={data} />
}

export default ProvidersPage
