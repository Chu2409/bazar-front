import { apiClient } from '@/config/http/api-client'
import { CUSTOMERS_API_ROUTES } from '../constants/customers-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { CustomerFiltersDto } from '../models/req/customers-filters.dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'
import { Customer } from '../models/res/customer'
import { CustomerDto } from '../models/req/customer.dto'
import { CustomersSearchDto } from '../models/req/customers-search.dto'

export const customersApi = {
  async findAll(params: CustomerFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<IApiPaginatedRes<Customer>>(
      CUSTOMERS_API_ROUTES.FIND_ALL,
      {
        params: normalizedParams,
      },
    )

    return response.data
  },

  async getBySearch(params: CustomersSearchDto) {
    const response = await apiClient.get<Customer[]>(
      CUSTOMERS_API_ROUTES.GET_BY_SEARCH,
      {
        params,
      },
    )

    return response.data!
  },

  async toggleStatus(id: number) {
    const response = await apiClient.patch<boolean>(
      CUSTOMERS_API_ROUTES.TOGGLE_STATUS(id),
    )

    return response.data
  },

  async create(data: CustomerDto) {
    const response = await apiClient.post<Customer>(
      CUSTOMERS_API_ROUTES.CREATE,
      data,
    )

    return response.data
  },

  async update(id: number, data: Partial<CustomerDto>) {
    const response = await apiClient.patch<Customer>(
      CUSTOMERS_API_ROUTES.UPDATE(id),
      data,
    )

    return response
  },
}
