import { IUser } from '@/core/users/models/user'
import { create } from 'zustand'

interface AuthState {
  user: IUser | null
  isAuthenticated: boolean
  setUser: (user: IUser | null) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: IUser | null) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  clearUser: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}))
