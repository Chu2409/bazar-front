import { BaseParamsReq } from '@/common/models/base-params-dto'

export class CategoriesFiltersDto extends BaseParamsReq {
  search?: string
  status?: number | number[]
}
