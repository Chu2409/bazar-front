import { apiClient } from '@/config/http/api-client'
import { CATEGORIES_API_ROUTES } from '../constants/categories-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { Category } from '../models/res/category'
import { CategoryDto } from '../models/req/category.dto'
import { CategoriesFiltersDto } from '../models/req/categories-filters.dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'

export const categoriesApi = {
  async findAll(params: CategoriesFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<IApiPaginatedRes<Category>>(
      CATEGORIES_API_ROUTES.FIND_ALL,
      {
        params: normalizedParams,
      },
    )

    return response.data!
  },

  async getBySearch(params: CategoriesFiltersDto) {
    const response = await apiClient.get<Category[]>(
      CATEGORIES_API_ROUTES.GET_BY_SEARCH,
      {
        params,
      },
    )

    return response.data!
  },

  async toggleStatus(id: number) {
    const response = await apiClient.patch<boolean>(
      CATEGORIES_API_ROUTES.TOGGLE_STATUS(id),
    )

    return response.data
  },

  async create(data: CategoryDto) {
    const response = await apiClient.post<Category>(
      CATEGORIES_API_ROUTES.CREATE,
      data,
    )

    return response.data
  },

  async update(id: number, data: Partial<CategoryDto>) {
    const response = await apiClient.patch<Category>(
      CATEGORIES_API_ROUTES.UPDATE(id),
      data,
    )

    return response.data
  },
}
