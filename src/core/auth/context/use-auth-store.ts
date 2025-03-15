import { User } from '@/core/users/models/res/user'
import { create } from 'zustand'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User | null) =>
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
