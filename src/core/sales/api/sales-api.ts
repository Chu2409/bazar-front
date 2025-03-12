import { apiClient } from '@/config/http/api-client'
import { SALES_API_ROUTES } from '../constants/sales-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { ISale } from '../models/sale'
import { ISalesReq } from '../models/sales-dto'
import { SalesFiltersDto } from '../models/sales-filters-dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'

export const salesApi = {
  async findAll(params: SalesFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<IApiPaginatedRes<ISale>>(
      SALES_API_ROUTES.FIND_ALL,
      {
        params: normalizedParams,
      },
    )

    return response.data
  },

  async create(product: ISalesReq) {
    const response = await apiClient.post<ISale>(
      SALES_API_ROUTES.CREATE,
      product,
    )

    return response.data
  },

  async update(id: number, product: Partial<ISalesReq>) {
    const response = await apiClient.patch<ISale>(
      SALES_API_ROUTES.UPDATE(id),
      product,
    )

    return response
  },
}
