'use client'

import LoadingSkeleton from '@/common/components/layout/loading-skeleton'
import { getAllParams } from '@/common/utils/params'
import { useInventoryFindAll } from '@/core/inventory/hooks/use-inventory-service'
import InventoryView from '@/core/inventory/presentation/views/inventory-view'
import { useSearchParams } from 'next/navigation'

const CustomersPage = () => {
  const params = useSearchParams()

  const { data, isLoading } = useInventoryFindAll(getAllParams(params))

  if (isLoading || !data) return <LoadingSkeleton />

  return <InventoryView data={data} />
}

export default CustomersPage
