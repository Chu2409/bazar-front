import { ICategory } from '@/core/categories/models/category'

export interface IProduct {
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
  categoryId: number
}

export interface IProductWithCategory extends IProduct {
  category: ICategory
}
