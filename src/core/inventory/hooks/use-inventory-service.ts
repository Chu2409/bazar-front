import { useMutation, useQuery } from '@tanstack/react-query'
import { inventoryApi } from '../api/inventory-api'
import { InventoryFiltersDto } from '../models/req/inventories-filters.dto'
import queryClient from '@/config/http/query-client'
import { InventoryDto } from '../models/req/inventory.dto'
import { InventorySearchDto } from '../models/req/inventories-search.dto'

export const useInventoryFindAll = (params: InventoryFiltersDto) => {
  return useQuery({
    queryKey: ['inventory', params],
    queryFn: () =>
      inventoryApi.findAll({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.status,
        categoryId: params.categoryId,
      }) || [],
    placeholderData: (previousData) => previousData,
  })
}

export const useGetBySearchInventory = (params: InventorySearchDto) => {
  return useQuery({
    queryKey: ['inventory', params],
    queryFn: () =>
      inventoryApi.getBySearch({
        search: params.search,
      }),
    placeholderData: (previousData) => previousData,
  })
}

export const useInventoryDelete = (id: number) => {
  return useMutation({
    mutationKey: ['inventory', id],
    mutationFn: async () => {
      const deleted = await inventoryApi.delete(id)
      queryClient.invalidateQueries({
        queryKey: ['inventory'],
      })

      return deleted
    },
  })
}

export const useInventoryCreate = () => {
  return useMutation({
    mutationKey: ['inventory'],
    mutationFn: async (data: InventoryDto) => {
      const created = await inventoryApi.create(data)
      if (created)
        queryClient.invalidateQueries({
          queryKey: ['inventory'],
        })

      return created
    },
  })
}

export const useInventoryUpdate = (id: number) => {
  return useMutation({
    mutationKey: ['inventory', id],
    mutationFn: async (data: Partial<InventoryDto>) => {
      const updated = await inventoryApi.update(id, data)
      queryClient.invalidateQueries({
        queryKey: ['inventory'],
      })

      return updated
    },
  })
}
