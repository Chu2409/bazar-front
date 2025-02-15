import { apiClient } from '@/config/http/api-client'
import { CATEGORIES_API_ROUTES } from '../constants/categories-api-routes'
import { ICategory } from '../models/category'
import { IApiPaginatedRes } from '@/config/http/api-response'

export const categoriesApi = {
  async findAll() {
    const response = await apiClient.get<IApiPaginatedRes<ICategory>>(
      CATEGORIES_API_ROUTES.FIND_ALL,
    )

    return response.data
  },
}
