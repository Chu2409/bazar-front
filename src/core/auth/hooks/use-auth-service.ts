import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/auth-api'
import { getToken, removeToken, setToken } from '@/common/utils/token-storage'
import { useAuthStore } from '../context/use-auth-store'
import { useRouter } from 'next/navigation'
import { SignInDto } from '../models/req/sign-in.dto'

export const useSignIn = () => {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: async (values: SignInDto) => {
      const data = await authApi.signIn(values)

      if (data) {
        await setToken(data.token)

        const user = await authApi.getMe()
        setUser(user)

        router.replace('/products')
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
  const router = useRouter()

  const signOut = async () => {
    clearUser()
    await removeToken()
    router.push('/sign-in')
  }

  return signOut
}
