import { useMutation } from '@tanstack/react-query'
import { ISignInReq } from '../models/sign-in-dto'
import { authService } from '../services/auth-service'
import { tokenStorage } from '@/shared/utils/token-storage'

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (values: ISignInReq) => {
      const data = await authService.signIn(values)

      tokenStorage.setToken(data!.token)
    },
  })
}
