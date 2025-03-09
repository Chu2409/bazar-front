import { apiClient } from '@/config/http/api-client'
import { INVENTORY_API_ROUTES } from '../constants/inventory-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { InventoryFiltersDto } from '../models/inventory-filters-dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'
import { IInventoryWithProductSupplier } from '../models/inventory'
import { IInventoryReq } from '../models/inventory-dto'

export const inventoryApi = {
  async findAll(params: InventoryFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<
      IApiPaginatedRes<IInventoryWithProductSupplier>
    >(INVENTORY_API_ROUTES.FIND_ALL, {
      params: normalizedParams,
    })

    return response.data
  },

  async delete(id: number) {
    const response = await apiClient.delete<object>(
      INVENTORY_API_ROUTES.DELETE(id),
    )

    return response.data
  },

  // async toggleStatus(id: number) {
  //   const response = await apiClient.patch<boolean>(
  //     INVENTORY_API_ROUTES.TOGGLE_STATUS(id),
  //   )

  //   return response.data
  // },

  async create(data: IInventoryReq) {
    const response = await apiClient.post<IInventoryWithProductSupplier>(
      INVENTORY_API_ROUTES.CREATE,
      data,
    )

    return response.data
  },

  async update(id: number, data: Partial<IInventoryReq>) {
    const response = await apiClient.patch<IInventoryWithProductSupplier>(
      INVENTORY_API_ROUTES.UPDATE(id),
      data,
    )

    return response
  },
}
