import { create } from 'zustand'
import { IProductWithCategory } from '../models/product'

interface State {
  isOpen: boolean
  onOpen: (provider?: IProductWithCategory) => void
  product?: IProductWithCategory
  onClose: () => void
}

export const useProductStore = create<State>((set) => ({
  isOpen: false,
  product: undefined,
  onOpen: (product) => set({ product, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
