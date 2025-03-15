import { BaseParamsReq } from '@/common/models/base-params-dto'

export class SalesFiltersDto extends BaseParamsReq {
  search?: string
  sort?: 'asc' | 'desc'
  order?: string
  categoryId?: number | number[]
}
