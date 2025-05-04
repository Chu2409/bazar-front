import { useQuery, useMutation } from '@tanstack/react-query'
import { productsApi } from '../api/products-api'
import { ProductDto } from '../models/req/product.dto'
import queryClient from '@/config/http/query-client'
import { ProductsFiltersDto } from '../models/req/products-filters.dto'
import { ProductsSearchDto } from '../models/req/products-search.dto'

export const useProductsFindAll = (params: ProductsFiltersDto) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () =>
      productsApi.findAll({
        categoryId: params.categoryId,
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.status,
      }) || [],
    placeholderData: (previousData) => previousData,
  })
}

export const useGetBySearchProducts = (params: ProductsSearchDto) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () =>
      productsApi.getBySearch({
        search: params.search,
      }),
    placeholderData: (previousData) => previousData,
  })
}

export const useToggleProductStatus = (id: number) => {
  return useMutation({
    mutationKey: ['products', id],
    mutationFn: async () => {
      const updated = await productsApi.toggleStatus(id)

      if (updated === true) {
        await queryClient.invalidateQueries({
          queryKey: ['products'],
        })
      }

      return updated === true
    },
  })
}

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['products'],
    mutationFn: async (product: ProductDto) => {
      const created = await productsApi.create(product)

      if (created === true) {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
      }

      return created === true
    },
  })
}

export const useUpdateProduct = (id: number) => {
  return useMutation({
    mutationKey: ['products', id],
    mutationFn: async (product: Partial<ProductDto>) => {
      const updated = await productsApi.update(id, product)

      if (updated) {
        queryClient.invalidateQueries({
          queryKey: ['products'],
        })
      }

      return updated === true
    },
  })
}
