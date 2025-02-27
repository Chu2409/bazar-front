import { apiClient } from '@/config/http/api-client'
import { CATEGORIES_API_ROUTES } from '../constants/categories-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { ICategory } from '../models/category'
import { ICategoryReq } from '../models/category-dto'
import { CategoryFiltersDto } from '../models/category-filters-dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'

export const categoriesApi = {
  async findAll(params: CategoryFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<IApiPaginatedRes<ICategory>>(
      CATEGORIES_API_ROUTES.FIND_ALL,
      {
        params: normalizedParams,
      },
    )

    return response.data
  },

  async toggleStatus(id: number) {
    const response = await apiClient.patch<boolean>(
      CATEGORIES_API_ROUTES.TOGGLE_STATUS(id),
    )

    return response.data
  },

  async create(data: ICategoryReq) {
    const response = await apiClient.post<ICategory>(
      CATEGORIES_API_ROUTES.CREATE,
      data,
    )

    return response.data
  },

  async update(id: number, data: Partial<ICategoryReq>) {
    const response = await apiClient.patch<ICategory>(
      CATEGORIES_API_ROUTES.UPDATE(id),
      data,
    )

    return response
  },
}
