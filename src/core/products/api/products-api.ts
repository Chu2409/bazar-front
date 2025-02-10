import { apiClient } from '@/config/http/api-client'
import { PRODUCTS_API_ROUTES } from '../constants/products-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { IProduct } from '../models/product'

export const productsApi = {
  async findAll() {
    const response = await apiClient.get<IApiPaginatedRes<IProduct>>(
      PRODUCTS_API_ROUTES.FIND_ALL,
      {
        params: {
          page: 1,
          limit: 10,
        },
      },
    )

    return response.data
  },
}
