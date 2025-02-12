import { create } from 'zustand'
import { IProductWithCategory } from '../models/product'

interface State {
  isOpen: boolean
  onOpen: (provider: IProductWithCategory | null) => void
  product: IProductWithCategory | null
  onClose: () => void
}

export const useProductStore = create<State>((set) => ({
  isOpen: false,
  product: null,
  onOpen: (product) => set({ product, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
