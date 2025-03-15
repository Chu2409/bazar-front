import { ItemDto } from './item.dto'

export interface SaleDto {
  subTotal: number
  discount: number
  total: number
  customerId: number
  items: ItemDto[]
}
