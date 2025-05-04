import { useQuery, useMutation } from '@tanstack/react-query'
import { customersApi } from '../api/customers-api'
import queryClient from '@/config/http/query-client'
import { CustomerFiltersDto } from '../models/req/customers-filters.dto'
import { CustomerDto } from '../models/req/customer.dto'
import { CustomersSearchDto } from '../models/req/customers-search.dto'

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
      const updated = await customersApi.toggleStatus(id)

      if (updated === true) {
        await queryClient.invalidateQueries({
          queryKey: ['customers'],
        })
      }

      return updated === true
    },
  })
}

export const useGetBySearchCustomers = (params: CustomersSearchDto) => {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: () =>
      customersApi.getBySearch({
        search: params.search,
      }),
    placeholderData: (previousData) => previousData,
  })
}

export const useCreateCustomer = () => {
  return useMutation({
    mutationKey: ['customers'],
    mutationFn: async (data: CustomerDto) => {
      const created = await customersApi.create(data)
      if (created === true)
        queryClient.invalidateQueries({
          queryKey: ['customers'],
        })

      return created === true
    },
  })
}

export const useUpdateCustomer = (id: number) => {
  return useMutation({
    mutationKey: ['customers', id],
    mutationFn: async (data: Partial<CustomerDto>) => {
      const updated = await customersApi.update(id, data)

      if (updated === true) {
        queryClient.invalidateQueries({
          queryKey: ['customers'],
        })
      }

      return updated === true
    },
  })
}
