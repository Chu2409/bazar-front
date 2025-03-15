import { create } from 'zustand'
import { Supplier } from '../models/res/supplier'

interface State {
  isOpen: boolean
  onOpen: (supplier?: Supplier) => void
  supplier?: Supplier
  onClose: () => void
}

export const useSupplierStore = create<State>((set) => ({
  isOpen: false,
  supplier: undefined,
  onOpen: (supplier) => set({ supplier: supplier, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
