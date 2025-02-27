import { IOption, ITableFilter } from '@/common/types/filters'
import { useCategoriesFindAll } from '@/core/categories/hooks/use-categories-service'

export const useProductsFilters = (): ITableFilter[] => {
  const { data: categories } = useCategoriesFindAll({})
  const categoriesMap: IOption[] =
    categories?.records.map((category) => ({
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

  return filters
}
