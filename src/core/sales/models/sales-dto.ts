import { IItemReq } from './item-dto'

export interface ISalesReq {
  subTotal: number
  discount: number
  total: number
  customerId: number
  items: IItemReq[]
}
