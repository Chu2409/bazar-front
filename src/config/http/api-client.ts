/* eslint-disable no-console */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { IApiResponse } from './api-response'
import { toast } from '@/shared/hooks/use-toast'

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
        validateStatus: () => true,
      })

      ApiClient.instance.interceptors.response.use(
        (response: AxiosResponse<IApiResponse<unknown>>) => {
          console.log('📡 Axios Response:', response.data)
          handleApiResponse(response.data)

          return response
        },
        (error: AxiosError<IApiResponse<unknown>>) => {
          console.log('📡 Axios Error:', error.response?.data)

          if (error.response?.data) {
            handleApiResponse(error.response.data)
          } else {
            // Para errores no controlados (como errores de red)
            toast({
              title: 'Error',
              description: 'Error de conexión con el servidor',
              variant: 'destructive',
            })
          }

          return Promise.reject(error.response)
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
  ): Promise<IApiResponse<T>> => {
    const client = ApiClient.getInstance()
    const response = await client.get<IApiResponse<T>>(url, config)
    return response.data
  },

  post: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<IApiResponse<T>> => {
    const client = ApiClient.getInstance()
    const response = await client.post<IApiResponse<T>>(url, data, config)
    return response.data
  },

  put: async <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<IApiResponse<T>> => {
    const client = ApiClient.getInstance()
    const response = await client.put<IApiResponse<T>>(url, data, config)
    return response.data
  },

  delete: async <T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IApiResponse<T>> => {
    const client = ApiClient.getInstance()
    const response = await client.delete<IApiResponse<T>>(url, config)
    return response.data
  },
}

const handleApiResponse = (response: IApiResponse<unknown>) => {
  const { success, message } = response

  if (!message.displayable && process.env.NODE_ENV === 'development') {
    toast({
      title: 'Debug Error',
      description: Array.isArray(message.content)
        ? message.content.join(', ')
        : message.content,
      variant: 'default',
      className: 'bg-yellow-500 text-black',
    })
    return
  }

  if (success) {
    toast({
      title: 'Éxito',
      description: Array.isArray(message.content)
        ? message.content.join(', ')
        : message.content,
      variant: 'default',
      className: 'bg-green-500 text-white',
    })
    return
  }

  if (!success && message.displayable) {
    toast({
      title: 'Error',
      description: Array.isArray(message.content)
        ? message.content.join(', ')
        : message.content,
      variant: 'destructive',
    })
    return
  }
}
