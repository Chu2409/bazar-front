import { Item } from '../../../items/models/res/item'
import { Customer } from '@/core/customers/models/res/customer'

export interface Sale {
  id: number
  dateTime: Date
  subTotal: number
  discount: number
  total: number
  active: boolean
  customer: Customer
  items: Item[]
}
