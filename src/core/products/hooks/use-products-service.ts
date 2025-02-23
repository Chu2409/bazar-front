import { useQuery, useMutation } from '@tanstack/react-query'
import { productsApi } from '../api/products-api'
import { IProductReq } from '../models/product-dto'
import queryClient from '@/config/http/query-client'
import { ProductsFiltersDto } from '../models/products-filters-dto'

export const useProductsFindAll = (params: ProductsFiltersDto) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.findAll(params) || [],
    placeholderData: (previousData) => previousData,
  })
}

export const useToggleProductStatus = (id: number) => {
  return useMutation({
    mutationKey: ['products', id],
    mutationFn: async () => {
      const status = await productsApi.toggleStatus(id)
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })

      return status
    },
  })
}

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: async (product: IProductReq) => {
      const productCreated = await productsApi.create(product)
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })

      return productCreated
    },
  })
}

export const useUpdateProduct = (id: number) => {
  return useMutation({
    mutationKey: ['products', id],
    mutationFn: async (product: Partial<IProductReq>) => {
      const productUpdated = await productsApi.update(id, product)
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })

      return productUpdated
    },
  })
}
