import { apiClient } from '@/config/http/api-client'
import { INVENTORY_API_ROUTES } from '../constants/inventory-api-routes'
import { IApiPaginatedRes } from '@/config/http/api-response'
import { InventoryFiltersDto } from '../models/req/inventories-filters.dto'
import { ensureDefaultParams } from '@/common/models/base-params-dto'
import { InventoryWithProductSupplier } from '../models/res/inventory'
import { InventoryDto } from '../models/req/inventory.dto'
import { InventorySearchDto } from '../models/req/inventories-search.dto'

export const inventoryApi = {
  async findAll(params: InventoryFiltersDto) {
    const normalizedParams = ensureDefaultParams(params)

    const response = await apiClient.get<
      IApiPaginatedRes<InventoryWithProductSupplier>
    >(INVENTORY_API_ROUTES.FIND_ALL, {
      params: normalizedParams,
    })

    return response.data
  },

  async delete(id: number) {
    const response = await apiClient.delete<boolean>(
      INVENTORY_API_ROUTES.DELETE(id),
    )

    return response.data
  },

  async getBySearch(params: InventorySearchDto) {
    const response = await apiClient.get<InventoryWithProductSupplier[]>(
      INVENTORY_API_ROUTES.GET_BY_SEARCH,
      {
        params,
      },
    )

    return response.data!
  },

  async create(data: InventoryDto) {
    const response = await apiClient.post<boolean>(
      INVENTORY_API_ROUTES.CREATE,
      data,
    )

    return response.data
  },

  async update(id: number, data: Partial<InventoryDto>) {
    const response = await apiClient.patch<boolean>(
      INVENTORY_API_ROUTES.UPDATE(id),
      data,
    )

    return response.data
  },
}
