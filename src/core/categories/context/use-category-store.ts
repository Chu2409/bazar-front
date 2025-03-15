import { create } from 'zustand'
import { Category } from '../models/res/category'

interface State {
  isOpen: boolean
  onOpen: (data?: Category) => void
  data?: Category
  onClose: () => void
}

export const useCategoryStore = create<State>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
