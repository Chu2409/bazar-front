import { useQuery, useMutation } from '@tanstack/react-query'
import { suppliersApi } from '../api/suppliers-api'
import { ISupplierReq } from '../models/supplier-dto'
import queryClient from '@/config/http/query-client'
import { SuppliersFiltersDto } from '../models/supplier-filters-dto'

export const useSuppliersFindAll = (params: SuppliersFiltersDto) => {
  return useQuery({
    queryKey: ['suppliers', params],
    queryFn: () =>
      suppliersApi.findAll({
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.status,
      }) || [],
    placeholderData: (previousData) => previousData,
  })
}

export const useToggleSupplierStatus = (id: number) => {
  return useMutation({
    mutationKey: ['suppliers', id],
    mutationFn: async () => {
      const status = await suppliersApi.toggleStatus(id)
      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      })

      return status
    },
  })
}

export const useCreateSupplier = () => {
  return useMutation({
    mutationKey: ['suppliers'],
    mutationFn: async (supplier: ISupplierReq) => {
      const created = await suppliersApi.create(supplier)
      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      })

      return created
    },
  })
}

export const useUpdateSupplier = (id: number) => {
  return useMutation({
    mutationKey: ['suppliers', id],
    mutationFn: async (supplier: Partial<ISupplierReq>) => {
      const updated = await suppliersApi.update(id, supplier)
      queryClient.invalidateQueries({
        queryKey: ['suppliers'],
      })

      return updated
    },
  })
}
