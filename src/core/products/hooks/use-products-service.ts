import { useQuery, useMutation } from '@tanstack/react-query'
import { productsApi } from '../api/products-api'
import { IProductReq } from '../models/product-dto'

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

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: async (product: IProductReq) => {
      return await productsApi.create(product)
    },
  })
}
