import { create } from 'zustand'
import { ISupplier } from '../models/supplier'

interface State {
  isOpen: boolean
  onOpen: (supplier?: ISupplier) => void
  supplier?: ISupplier
  onClose: () => void
}

export const useSupplierStore = create<State>((set) => ({
  isOpen: false,
  supplier: undefined,
  onOpen: (supplier) => set({ supplier: supplier, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
