import { IApiRes } from '@/config/http/api-response'
import { useToast } from './use-toast'

export function useApiToast() {
  const { toast } = useToast()

  const showToastFromResponse = <T>(response: IApiRes<T>) => {
    const { success, message } = response

    // Caso 1: Respuesta exitosa
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

    // Caso 2: Error mostrable al usuario
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

    // Caso 3: Error de debug (solo en desarrollo)
    if (
      !success &&
      !message.displayable &&
      process.env.NODE_ENV === 'development'
    ) {
      toast({
        title: 'Debug Error',
        description: Array.isArray(message.content)
          ? message.content.join(', ')
          : message.content,
        variant: 'default',
        className: 'bg-yellow-500 text-black',
      })
    }
  }

  return { showToastFromResponse }
}
