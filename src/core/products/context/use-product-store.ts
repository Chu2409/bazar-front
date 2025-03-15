import { create } from 'zustand'
import { ProductWithCategory } from '../models/res/product'

interface State {
  isOpen: boolean
  onOpen: (provider?: ProductWithCategory) => void
  product?: ProductWithCategory
  onClose: () => void
}

export const useProductStore = create<State>((set) => ({
  isOpen: false,
  product: undefined,
  onOpen: (product) => set({ product, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
