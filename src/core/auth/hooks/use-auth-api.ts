import { useMutation } from '@tanstack/react-query'
import { ILoginReq, ILoginRes } from '../models/login-dto'
import { authService } from '../services/auth-service'

export const useLogin = () => {
  return useMutation({
    mutationFn: async (values: ILoginReq): Promise<ILoginRes> => {
      const data = await authService.login(values)

      localStorage.setItem('token', data.token)

      return data
    },
  })
}
