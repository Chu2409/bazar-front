import { create } from 'zustand'
import { ICustomer } from '../models/customer'

interface State {
  isOpen: boolean
  onOpen: (data?: ICustomer) => void
  data?: ICustomer
  onClose: () => void
}

export const useCustomerStore = create<State>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data) => set({ data, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
