import {
  Product,
  ProductWithCategory,
} from '@/core/products/models/res/product'
import { Supplier } from '@/core/suppliers/models/res/supplier'

export interface Inventory {
  id: number
  purchasedQty: number
  stock: number
  unitCost: number
  totalCost: number
  productId: number
  supplierId: number
}

export interface InventoryWithProductSupplier extends Inventory {
  product: ProductWithCategory
  supplier: Supplier
}

export interface InventoryWithProduct extends Inventory {
  product: Product
}
