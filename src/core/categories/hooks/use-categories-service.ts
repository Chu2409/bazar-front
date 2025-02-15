import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '../api/categories-api'

export const useCategoriesFindAll = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ['categories', page, limit],
    queryFn: () => categoriesApi.findAll(),
    placeholderData: (previousData) => previousData,
  })
}
