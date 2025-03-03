import { BaseParamsReq } from '@/common/models/base-params-dto'

export class CustomerFiltersDto extends BaseParamsReq {
  search?: string
  status?: number | number[]
}
