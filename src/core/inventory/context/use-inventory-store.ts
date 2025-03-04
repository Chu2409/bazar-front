import { create } from 'zustand'
import { IInventoryWithProductSupplier } from '../models/inventory'

interface State {
  isOpen: boolean
  onOpen: (data?: IInventoryWithProductSupplier) => void
  data?: IInventoryWithProductSupplier
  onClose: () => void
}

export const useInventoryStore = create<State>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
