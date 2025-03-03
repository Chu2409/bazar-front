import { useQuery, useMutation } from '@tanstack/react-query'
import { customersApi } from '../api/customers-api'
import queryClient from '@/config/http/query-client'
import { CustomerFiltersDto } from '../models/customers-filters-dto'
import { ICustomerReq } from '../models/customer-dto'

export const useCustomersFindAll = (params: CustomerFiltersDto) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () =>
      customersApi.findAll({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.status,
      }) || [],
    placeholderData: (previousData) => previousData,
  })
}

export const useToggleCustomerStatus = (id: number) => {
  return useMutation({
    mutationKey: ['customers', id],
    mutationFn: async () => {
      const status = await customersApi.toggleStatus(id)
      queryClient.invalidateQueries({
        queryKey: ['customers'],
      })

      return status
    },
  })
}

export const useCreateCustomer = () => {
  return useMutation({
    mutationKey: ['customers'],
    mutationFn: async (data: ICustomerReq) => {
      const created = await customersApi.create(data)
      if (created)
        queryClient.invalidateQueries({
          queryKey: ['customers'],
        })

      return created
    },
  })
}

export const useUpdateCustomer = (id: number) => {
  return useMutation({
    mutationKey: ['customers', id],
    mutationFn: async (data: Partial<ICustomerReq>) => {
      const updated = await customersApi.update(id, data)
      queryClient.invalidateQueries({
        queryKey: ['customers'],
      })

      return updated
    },
  })
}
