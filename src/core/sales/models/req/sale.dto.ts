import { ItemDto } from '../../../items/models/req/item.dto'

export interface SaleDto {
  subTotal: number
  discount: number
  total: number
  customerId: number
  items: ItemDto[]
}
