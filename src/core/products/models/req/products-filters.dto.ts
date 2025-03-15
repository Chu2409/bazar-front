import { BaseParamsReq } from '@/common/models/base-params-dto'

export class ProductsFiltersDto extends BaseParamsReq {
  search?: string
  sort?: 'asc' | 'desc'
  order?: string
  status?: number | number[]
  categoryId?: number | number[]
}
