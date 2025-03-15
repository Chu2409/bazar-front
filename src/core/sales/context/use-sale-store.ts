import { create } from 'zustand'
import { Sale } from '../models/res/sale'

interface State {
  isOpen: boolean
  onOpen: (entity?: Sale) => void
  entity?: Sale
  onClose: () => void
}

export const useSaleStore = create<State>((set) => ({
  isOpen: false,
  entity: undefined,
  onOpen: (entity) => set({ entity, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
