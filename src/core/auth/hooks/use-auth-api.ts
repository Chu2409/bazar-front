import { useMutation } from '@tanstack/react-query'
import { ISignInReq, ISignInRes } from '../models/sign-in-dto'
import { authService } from '../services/auth-service'

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (values: ISignInReq): Promise<ISignInRes> => {
      const data = await authService.signIn(values)

      // localStorage.setItem('token', data.token)

      return data
    },
  })
}
