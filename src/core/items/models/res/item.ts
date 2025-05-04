import { InventoryWithProduct } from '@/core/inventory/models/res/inventory'

export interface Item {
  id: number
  qty: number
  unitPrice: number
  inventory: InventoryWithProduct
}
