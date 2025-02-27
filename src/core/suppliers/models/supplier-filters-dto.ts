import { BaseParamsReq } from '@/common/models/base-params-dto'

export class SuppliersFiltersDto extends BaseParamsReq {
  search?: string
  status?: number | number[]
}
