import { useQuery, useMutation } from '@tanstack/react-query'
import { salesApi } from '../api/sales-api'
import { SaleDto } from '../models/req/sale.dto'
import queryClient from '@/config/http/query-client'
import { SalesFiltersDto } from '../models/req/sales-filters.dto'

export const useFindAllSales = (params: SalesFiltersDto) => {
  return useQuery({
    queryKey: ['sales', params],
    queryFn: () =>
      salesApi.findAll({
        page: params.page,
        limit: params.limit,
        search: params.search,
      }) || [],
    placeholderData: (previousData) => previousData,
  })
}

export const useCreateSale = () => {
  return useMutation({
    mutationKey: ['sales'],
    mutationFn: async (product: SaleDto) => {
      const productCreated = await salesApi.create(product)
      queryClient.invalidateQueries({
        queryKey: ['sales'],
      })

      return productCreated
    },
  })
}

export const useUpdateSale = (id: number) => {
  return useMutation({
    mutationKey: ['sales', id],
    mutationFn: async (product: Partial<SaleDto>) => {
      const productUpdated = await salesApi.update(id, product)
      queryClient.invalidateQueries({
        queryKey: ['sales'],
      })

      return productUpdated
    },
  })
}
