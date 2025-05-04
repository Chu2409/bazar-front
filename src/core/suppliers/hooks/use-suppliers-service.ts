import { useQuery, useMutation } from '@tanstack/react-query'
import { suppliersApi } from '../api/suppliers-api'
import { SupplierDto } from '../models/req/supplier.dto'
import queryClient from '@/config/http/query-client'
import { SuppliersFiltersDto } from '../models/req/suppliers-filters.dto'
import { SuppliersSearchDto } from '../models/req/suppliers-search.dto'

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
      const updated = await suppliersApi.toggleStatus(id)

      if (updated === true) {
        await queryClient.invalidateQueries({
          queryKey: ['suppliers'],
        })
      }

      return updated === true
    },
  })
}

export const useGetBySearchSuppliers = (params: SuppliersSearchDto) => {
  return useQuery({
    queryKey: ['suppliers', params],
    queryFn: () =>
      suppliersApi.getBySearch({
        search: params.search,
      }),
    placeholderData: (previousData) => previousData,
  })
}

export const useCreateSupplier = () => {
  return useMutation({
    mutationKey: ['suppliers'],
    mutationFn: async (supplier: SupplierDto) => {
      const created = await suppliersApi.create(supplier)

      if (created === true) {
        await queryClient.invalidateQueries({
          queryKey: ['suppliers'],
        })
      }

      return created === true
    },
  })
}

export const useUpdateSupplier = (id: number) => {
  return useMutation({
    mutationKey: ['suppliers', id],
    mutationFn: async (supplier: Partial<SupplierDto>) => {
      const updated = await suppliersApi.update(id, supplier)

      if (updated === true) {
        await queryClient.invalidateQueries({
          queryKey: ['suppliers'],
        })
      }

      return updated === true
    },
  })
}
