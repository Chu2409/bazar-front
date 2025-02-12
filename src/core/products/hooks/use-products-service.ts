import { useQuery, useMutation } from '@tanstack/react-query'
import { productsApi } from '../api/products-api'

export const useProductsFindAll = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => productsApi.findAll() || [],
    placeholderData: (previousData) => previousData,
  })
}

export const useToggleProductStatus = (id: number) => {
  return useMutation({
    mutationKey: ['products', id],
    mutationFn: async () => {
      return await productsApi.toggleStatus(id)
    },
  })
}
