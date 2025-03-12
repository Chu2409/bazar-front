import { IInventoryWithProduct } from '@/core/inventory/models/inventory'

export interface IItem {
  id: number
  qty: number
  unitPrice: number
  lotId: number
  saleId: number
  lot: IInventoryWithProduct
}
