import { apiClient } from '@/config/http/api-client'
import { PRODUCTS_API_ROUTES } from '../constants/products-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { IProduct, IProductWithCategory } from '../models/product'
import { IProductReq } from '../models/product-dto'
import { ProductsFiltersDto } from '../models/products-filters-dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'
import { ProductsSearchDto } from '../models/req/products-search.dto'

export const productsApi = {
  async findAll(params: ProductsFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<
      IApiPaginatedRes<IProductWithCategory>
    >(PRODUCTS_API_ROUTES.FIND_ALL, {
      params: normalizedParams,
    })

    return response.data
  },

  async getBySearch(params: ProductsSearchDto) {
    const response = await apiClient.get<IProduct[]>(
      PRODUCTS_API_ROUTES.GET_BY_SEARCH,
      {
        params,
      },
    )

    return response.data!
  },

  async toggleStatus(id: number) {
    const response = await apiClient.patch<boolean>(
      PRODUCTS_API_ROUTES.TOGGLE_STATUS(id),
    )

    return response.data
  },

  async create(product: IProductReq) {
    const response = await apiClient.post<IProduct>(
      PRODUCTS_API_ROUTES.CREATE,
      product,
    )

    return response.data
  },

  async update(id: number, product: Partial<IProductReq>) {
    const response = await apiClient.patch<IProduct>(
      PRODUCTS_API_ROUTES.UPDATE(id),
      product,
    )

    return response
  },
}
