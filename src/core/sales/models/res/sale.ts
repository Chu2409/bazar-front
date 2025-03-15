import { Item } from './item'
import { Customer } from '@/core/customers/models/res/customer'

export interface Sale {
  id: number
  dateTime: Date
  subTotal: number
  discount: number
  total: number
  active: boolean
  customerId: number
  customer: Customer
  items: Item[]
}
