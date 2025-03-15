import { apiClient } from '@/config/http/api-client'
import { SignIn } from '../models/res/sign-in'
import { AUTH_API_ROUTES } from '../constants/auth-api-routes'
import { User } from '@/core/users/models/res/user'
import { SignInDto } from '../models/req/sign-in.dto'

export const authApi = {
  async signIn(dto: SignInDto) {
    const response = await apiClient.post<SignIn>(AUTH_API_ROUTES.SIGN_IN, dto)

    return response.data
  },

  async getMe() {
    const response = await apiClient.get<User>(AUTH_API_ROUTES.ME)

    return response.data
  },
}
