import { create } from 'zustand'
import { Customer } from '../models/res/customer'

interface State {
  isOpen: boolean
  onOpen: (data?: Customer) => void
  data?: Customer
  onClose: () => void
}

export const useCustomerStore = create<State>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
