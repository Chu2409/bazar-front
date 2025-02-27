import { create } from 'zustand'
import { ICategory } from '../models/category'

interface State {
  isOpen: boolean
  onOpen: (data?: ICategory) => void
  data?: ICategory
  onClose: () => void
}

export const useCategoryStore = create<State>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
