import { IProductWithCategory } from '@/core/products/models/product'
import { ISupplier } from '@/core/suppliers/models/supplier'

export interface IInventory {
  id: number
  purchasedQty: number
  stock: number
  unitCost: number
  totalCost: number
  productId: number
  supplierId: number
}

export interface IInventoryWithProductSupplier extends IInventory {
  product: IProductWithCategory
  supplier: ISupplier
}
