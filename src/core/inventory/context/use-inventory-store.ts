import { create } from 'zustand'
import { InventoryWithProductSupplier } from '../models/res/inventory'

interface State {
  isOpen: boolean
  onOpen: (data?: InventoryWithProductSupplier) => void
  data?: InventoryWithProductSupplier
  onClose: () => void
}

export const useInventoryStore = create<State>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
