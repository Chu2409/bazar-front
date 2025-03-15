import { useQuery, useMutation } from '@tanstack/react-query'
import { categoriesApi } from '../api/categories-api'
import { CategoryDto } from '../models/req/category.dto'
import queryClient from '@/config/http/query-client'
import { CategoriesFiltersDto } from '../models/req/categories-filters.dto'
import { CategoriesSearchDto } from '../models/req/categories-search.dto'

export const useCategoriesFindAll = (params: CategoriesFiltersDto) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () =>
      categoriesApi.findAll({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.status,
      }) || [],
    placeholderData: (previousData) => previousData,
  })
}

export const useGetBySearchCategories = (params: CategoriesSearchDto) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () =>
      categoriesApi.getBySearch({
        search: params.search,
      }),
    placeholderData: (previousData) => previousData,
  })
}

export const useToggleCategoryStatus = (id: number) => {
  return useMutation({
    mutationKey: ['categories', id],
    mutationFn: async () => {
      const status = await categoriesApi.toggleStatus(id)
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })

      return status
    },
  })
}

export const useCreateCategory = () => {
  return useMutation({
    mutationKey: ['categories'],
    mutationFn: async (data: CategoryDto) => {
      const created = await categoriesApi.create(data)
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })

      return created
    },
  })
}

export const useUpdateCategory = (id: number) => {
  return useMutation({
    mutationKey: ['categories', id],
    mutationFn: async (data: Partial<CategoryDto>) => {
      const updated = await categoriesApi.update(id, data)
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })

      return updated
    },
  })
}
