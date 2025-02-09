import { IApiRes } from '@/config/http/api-response'
import { toast } from '../hooks/use-toast'

const isProduction = process.env.NODE_ENV === 'production'

export const showResponseToast = (response: IApiRes<unknown>) => {
  if (!response.message.displayable && isProduction) return

  const { success, message } = response

  if (!message.displayable) {
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

  toast({
    title: 'Error',
    description: Array.isArray(message.content)
      ? message.content.join(', ')
      : message.content,
    variant: 'destructive',
    className: 'bg-red-500 text-white',
  })
}

export const showErrorToast = (message: string) => {
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
    className: 'bg-red-500 text-white',
  })
}
