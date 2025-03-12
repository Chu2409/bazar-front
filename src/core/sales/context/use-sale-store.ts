import { create } from 'zustand'
import { ISale } from '../models/sale'

interface State {
  isOpen: boolean
  onOpen: (entity?: ISale) => void
  entity?: ISale
  onClose: () => void
}

export const useSaleStore = create<State>((set) => ({
  isOpen: false,
  entity: undefined,
  onOpen: (entity) => set({ entity, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
