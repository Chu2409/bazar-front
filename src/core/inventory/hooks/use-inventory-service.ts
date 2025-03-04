import { useMutation, useQuery } from '@tanstack/react-query'
import { inventoryApi } from '../api/inventory-api'
import { InventoryFiltersDto } from '../models/inventory-filters-dto'
import queryClient from '@/config/http/query-client'

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

// export const useToggleCustomerStatus = (id: number) => {
//   return useMutation({
//     mutationKey: ['customers', id],
//     mutationFn: async () => {
//       const status = await inventoryApi.toggleStatus(id)
//       queryClient.invalidateQueries({
//         queryKey: ['customers'],
//       })

//       return status
//     },
//   })
// }

// export const useCreateCustomer = () => {
//   return useMutation({
//     mutationKey: ['customers'],
//     mutationFn: async (data: IInventoryReq) => {
//       const created = await inventoryApi.create(data)
//       if (created)
//         queryClient.invalidateQueries({
//           queryKey: ['customers'],
//         })

//       return created
//     },
//   })
// }

// export const useUpdateCustomer = (id: number) => {
//   return useMutation({
//     mutationKey: ['customers', id],
//     mutationFn: async (data: Partial<IInventoryReq>) => {
//       const updated = await inventoryApi.update(id, data)
//       queryClient.invalidateQueries({
//         queryKey: ['customers'],
//       })

//       return updated
//     },
//   })
// }
