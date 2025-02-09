import { useMutation } from '@tanstack/react-query'
import { ISignInReq } from '../models/sign-in-dto'
import { authApi } from '../api/auth-api'
import { getToken, removeToken, setToken } from '@/common/utils/token-storage'
import { useAuthStore } from '../context/use-auth-store'

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (values: ISignInReq) => {
      const data = await authApi.signIn(values)

      if (data) {
        await setToken(data.token)
      }
    },
  })
}

export const useValidateToken = () => {
  const setUser = useAuthStore((state) => state.setUser)
  const clearUser = useAuthStore((state) => state.clearUser)

  return useMutation({
    mutationFn: async () => {
      const token = await getToken()
      if (!token) {
        clearUser()
        return false
      }

      const data = await authApi.getMe()
      setUser(data)

      return true
    },
  })
}

export const useSignOut = () => {
  const clearUser = useAuthStore((state) => state.clearUser)

  const signOut = async () => {
    clearUser()
    await removeToken()
  }

  return signOut
}
