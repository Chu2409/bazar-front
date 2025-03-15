import { useMutation, useQuery } from '@tanstack/react-query'
import { inventoryApi } from '../api/inventory-api'
import { InventoryFiltersDto } from '../models/inventory-filters-dto'
import queryClient from '@/config/http/query-client'
import { IInventoryReq } from '../models/inventory-dto'
import { InventorySearchDto } from '../models/req/search.dto'

export const useInventoryFindAll = (params: InventoryFiltersDto) => {
  return useQuery({
    queryKey: ['inventory', params],
    queryFn: () =>
      inventoryApi.findAll({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.status,
        barcode: params.barcode,
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
    mutationFn: async (data: IInventoryReq) => {
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
    mutationFn: async (data: Partial<IInventoryReq>) => {
      const updated = await inventoryApi.update(id, data)
      queryClient.invalidateQueries({
        queryKey: ['inventory'],
      })

      return updated
    },
  })
}
