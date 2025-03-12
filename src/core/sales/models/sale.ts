import { IItem } from './item'
import { ICustomer } from '@/core/customers/models/customer'

export interface ISale {
  id: number
  dateTime: Date
  subTotal: number
  discount: number
  total: number
  active: boolean
  customerId: number
  customer: ICustomer
  items: IItem[]
}
