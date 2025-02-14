export interface IProductReq {
  name: string
  retailPrice: number
  wholesalePrice: number
  wholesaleQty: number
  minStock: number
  categoryId: number
  barcode?: string | undefined
  description?: string | undefined
  image?: string | undefined
  active?: boolean | undefined
}
