import { IOption, ITableFilter } from '@/common/types/filters'
import { useGetBySearchCategories } from '@/core/categories/hooks/use-categories-service'
import { useState } from 'react'

export const useProductsFilters = () => {
  const [categoriesSearch, setCategoriesSearch] = useState<string>('')
  const { data: categories } = useGetBySearchCategories({
    search: categoriesSearch,
  })
  const categoriesMap: IOption[] =
    categories?.map((category) => ({
      id: category.id,
      label: category.name,
    })) || []

  const filters: ITableFilter[] = [
    {
      key: 'categoryId',
      values: categoriesMap,
      getById: (id: number) => {
        return categoriesMap.find((category) => category.id === id)
      },
    },
  ]

  return {
    filters,
    setCategoriesSearch,
  }
}
