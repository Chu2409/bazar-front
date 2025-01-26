import { apiClient } from '@/config/http/api-client'
import { ILoginReq, ILoginRes } from '../models/login-dto'
import { AUTH_API_ROUTES } from '../constants/auth-api-routes'

export const authService = {
  async login(loginDto: ILoginReq) {
    const response = await apiClient.post<ILoginRes>(
      AUTH_API_ROUTES.LOGIN,
      loginDto,
    )

    return response.data
  },
}
