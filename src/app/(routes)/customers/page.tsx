'use client'

import LoadingSkeleton from '@/common/components/layout/loading-skeleton'
import { getAllParams } from '@/common/utils/params'
import { useCustomersFindAll } from '@/core/customers/hooks/use-customers-service'
import CustomersView from '@/core/customers/presentation/views/customers-view'
import { useSearchParams } from 'next/navigation'

const CustomersPage = () => {
  const params = useSearchParams()

  const { data, isLoading } = useCustomersFindAll(getAllParams(params))

  if (isLoading || !data) return <LoadingSkeleton />

  return <CustomersView data={data} />
}

export default CustomersPage
