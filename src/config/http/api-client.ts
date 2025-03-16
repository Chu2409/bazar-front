import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { IApiRes } from './api-response'
import { showErrorToast, showResponseToast } from '@/common/utils/toast'
import { useAuthStore } from '@/core/auth/context/use-auth-store'
import { getToken, removeToken } from '@/common/utils/token-storage'
import { redirect } from 'next/navigation'
import qs from 'query-string'

class ApiClient {
  private static instance: AxiosInstance

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!ApiClient.instance) {
      ApiClient.instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
        paramsSerializer: {
          serialize: (params) => qs.stringify(params, { arrayFormat: 'none' }),
        },
      })

      ApiClient.instance.interceptors.request.use(
        async (config) => {
          const token = await getToken()
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }
          return config
        },
        (error) => Promise.reject(error),
      )

      // ApiClient.instance.interceptors.request.use((config) => {
      //   console.log('📡 Axios Request:', {
      //     url: process.env.NEXT_PUBLIC_API_URL! + config.url,
      //     method: config.method,
      //     headers: config.headers,
      //     data: config.data,
      //   })
      //   return config
      // })

      ApiClient.instance.interceptors.response.use(
        (response: AxiosResponse<IApiRes<unknown>>) => {
          showResponseToast(response.data)
          return response
        },
        async (error: AxiosError<IApiRes<unknown>>) => {
          if (error.response) {
            if (error.response.status === 401) {
              await removeToken()
              const clearUser = useAuthStore.getState().clearUser
              clearUser()
              showErrorToast('Vuelve a iniciar sesión')
              redirect('/sign-in')
            } else if (error.response.data) {
              showResponseToast(error.response.data)
              return Promise.resolve(error.response)
            }
          } else if (error.request) {
            showErrorToast('Error de conexión con el servidor')
          } else {
            showErrorToast('Error al procesar la solicitud')
          }

          return Promise.reject(error)
        },
      )
    }
    return ApiClient.instance
  }
}

export const apiClient = {
  get: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IApiRes<T>> => {
    try {
      const client = ApiClient.getInstance()
      const response = await client.get<IApiRes<T>>(url, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      throw error
    }
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<IApiRes<T>> => {
    try {
      const client = ApiClient.getInstance()
      const response = await client.post<IApiRes<T>>(url, data, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      throw error
    }
  },

  patch: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<IApiRes<T>> => {
    try {
      const client = ApiClient.getInstance()
      const response = await client.patch<IApiRes<T>>(url, data, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      throw error
    }
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IApiRes<T>> => {
    try {
      const client = ApiClient.getInstance()
      const response = await client.delete<IApiRes<T>>(url, config)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        return error.response.data
      }
      throw error
    }
  },
}
