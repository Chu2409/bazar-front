import { apiClient } from '@/config/http/api-client'
import { ISignInReq, ISignInRes } from '../models/sign-in-dto'
import { AUTH_API_ROUTES } from '../constants/auth-api-routes'

export const authService = {
  async signIn(dto: ISignInReq) {
    const response = await apiClient.post<ISignInRes>(
      AUTH_API_ROUTES.SIGN_IN,
      dto,
    )

    return response.data
  },
}
