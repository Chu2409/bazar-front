import { Category } from '@/core/categories/models/res/category'

export interface Product {
  id: number
  barcode: string | null
  name: string
  description: string | null
  retailPrice: number
  wholesalePrice: number
  wholesaleQty: number
  minStock: number
  image: string | null
  active: boolean
}

export interface ProductWithCategory extends Product {
  category: Category
}
