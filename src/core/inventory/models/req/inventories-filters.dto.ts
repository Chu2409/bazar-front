import { BaseParamsReq } from '@/common/models/base-params-dto'

export class InventoryFiltersDto extends BaseParamsReq {
  search?: string
  barcode?: string
  categoryId?: number | number[]
  status?: number | number[]
}
