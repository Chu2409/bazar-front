import { BaseParamsReq } from '@/common/models/base-params-dto'

export class CategoryFiltersDto extends BaseParamsReq {
  search?: string
  status?: number | number[]
}
