import { apiClient } from '@/config/http/api-client'
import { SUPPLIERS_API_ROUTES } from '../constants/suppliers-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { Supplier } from '../models/res/supplier'
import { SupplierDto } from '../models/req/supplier.dto'
import { SuppliersFiltersDto } from '../models/req/suppliers-filters.dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'
import { SuppliersSearchDto } from '../models/req/suppliers-search.dto'

export const suppliersApi = {
  async findAll(params: SuppliersFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<IApiPaginatedRes<Supplier>>(
      SUPPLIERS_API_ROUTES.FIND_ALL,
      {
        params: normalizedParams,
      },
    )

    return response.data
  },

  async getBySearch(params: SuppliersSearchDto) {
    const response = await apiClient.get<Supplier[]>(
      SUPPLIERS_API_ROUTES.GET_BY_SEARCH,
      {
        params,
      },
    )

    return response.data!
  },

  async toggleStatus(id: number) {
    const response = await apiClient.patch<boolean | null>(
      SUPPLIERS_API_ROUTES.TOGGLE_STATUS(id),
    )

    return response.data
  },

  async create(supplier: SupplierDto) {
    const response = await apiClient.post<boolean | null>(
      SUPPLIERS_API_ROUTES.CREATE,
      supplier,
    )

    return response.data
  },

  async update(id: number, supplier: Partial<SupplierDto>) {
    const response = await apiClient.patch<boolean | null>(
      SUPPLIERS_API_ROUTES.UPDATE(id),
      supplier,
    )

    return response.data
  },
}
