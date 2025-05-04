import { apiClient } from '@/config/http/api-client'
import { SALES_API_ROUTES } from '../constants/sales-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { Sale } from '../models/res/sale'
import { SaleDto } from '../models/req/sale.dto'
import { SalesFiltersDto } from '../models/req/sales-filters.dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'

export const salesApi = {
  async findAll(params: SalesFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<IApiPaginatedRes<Sale>>(
      SALES_API_ROUTES.FIND_ALL,
      {
        params: normalizedParams,
      },
    )

    return response.data
  },

  async create(product: SaleDto) {
    const response = await apiClient.post<boolean>(
      SALES_API_ROUTES.CREATE,
      product,
    )

    return response.data
  },

  async update(id: number, product: Partial<SaleDto>) {
    const response = await apiClient.patch<boolean>(
      SALES_API_ROUTES.UPDATE(id),
      product,
    )

    return response
  },
}
