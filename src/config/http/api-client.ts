/* eslint-disable no-console */
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

      ApiClient.instance.interceptors.response.use(
        (response: AxiosResponse<IApiRes<unknown>>) => {
          console.log('📡 Axios Response:', response.data)
          showResponseToast(response.data)
          return response
        },
        async (error: AxiosError<IApiRes<unknown>>) => {
          console.log('📡 Axios Error:', error.response?.data)

          // Si hay una respuesta del servidor, significa que el servidor respondió con un error HTTP
          if (error.response) {
            // Caso específico de autenticación
            if (error.response.status === 401) {
              await removeToken()
              const clearUser = useAuthStore.getState().clearUser
              clearUser()
              showErrorToast('Vuelve a iniciar sesión')
            }
            // Para todos los demás casos donde el servidor respondió con un formato válido
            else if (error.response.data) {
              showResponseToast(error.response.data)
              // Retornamos la respuesta para que pueda ser manejada por el código que hizo la petición
              return Promise.resolve(error.response)
            }
          }
          // Error de red o timeout
          else if (error.request) {
            showErrorToast('Error de conexión con el servidor')
          }
          // Otros errores
          else {
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

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<IApiRes<T>> => {
    try {
      const client = ApiClient.getInstance()
      const response = await client.put<IApiRes<T>>(url, data, config)
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
