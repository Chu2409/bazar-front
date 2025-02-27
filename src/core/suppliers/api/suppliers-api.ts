import { apiClient } from '@/config/http/api-client'
import { SUPPLIERS_API_ROUTES } from '../constants/suppliers-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { ISupplier } from '../models/supplier'
import { ISupplierReq } from '../models/supplier-dto'
import { SuppliersFiltersDto } from '../models/supplier-filters-dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'

export const suppliersApi = {
  async findAll(params: SuppliersFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<IApiPaginatedRes<ISupplier>>(
      SUPPLIERS_API_ROUTES.FIND_ALL,
      {
        params: normalizedParams,
      },
    )

    return response.data
  },

  async toggleStatus(id: number) {
    const response = await apiClient.patch<boolean>(
      SUPPLIERS_API_ROUTES.TOGGLE_STATUS(id),
    )

    return response.data
  },

  async create(supplier: ISupplierReq) {
    const response = await apiClient.post<ISupplier>(
      SUPPLIERS_API_ROUTES.CREATE,
      supplier,
    )

    return response.data
  },

  async update(id: number, supplier: Partial<ISupplierReq>) {
    const response = await apiClient.patch<ISupplier>(
      SUPPLIERS_API_ROUTES.UPDATE(id),
      supplier,
    )

    return response
  },
}
