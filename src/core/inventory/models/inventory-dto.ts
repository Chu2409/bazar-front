export interface IInventoryReq {
  purchasedQty: number
  unitCost: number
  totalCost: number
  productId: number
  supplierId: number
  stock?: number
}
