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
      const created = await salesApi.create(product)

      if (created === true) {
        await queryClient.invalidateQueries({
          queryKey: ['sales'],
        })
      }

      return created === true
    },
  })
}

export const useUpdateSale = (id: number) => {
  return useMutation({
    mutationKey: ['sales', id],
    mutationFn: async (product: Partial<SaleDto>) => {
      const updated = await salesApi.update(id, product)

      if (updated === true) {
        await queryClient.invalidateQueries({
          queryKey: ['sales'],
        })
      }

      return updated === true
    },
  })
}
