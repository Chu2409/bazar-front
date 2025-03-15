export interface ProductDto {
  name: string
  retailPrice: number
  wholesalePrice: number
  wholesaleQty: number
  minStock: number
  categoryId: number
  barcode?: string
  description?: string
  image?: string
  active?: boolean
}
