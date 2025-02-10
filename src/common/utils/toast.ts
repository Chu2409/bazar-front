import { IApiRes } from '@/config/http/api-response'
import { toast } from '../hooks/use-toast'

const isProduction = process.env.NODE_ENV === 'production'

export const showResponseToast = (response: IApiRes<unknown>) => {
  const { success, message } = response
  if (!message.displayable && isProduction) return

  const msg = Array.isArray(message.content)
    ? message.content.join(', ')
    : message.content

  if (!message.displayable) {
    showDebugToast(msg)
  } else if (success) {
    showSuccessToast(msg)
  } else showErrorToast(msg)
}

export const showSuccessToast = (message: string, title?: string) => {
  toast({
    title: title || 'Success',
    description: message,
    variant: 'default',
    className: 'bg-green-500 text-white',
  })
}

export const showErrorToast = (message: string, title?: string) => {
  toast({
    title: title || 'Error',
    description: message,
    variant: 'destructive',
    className: 'bg-red-500 text-white',
  })
}

export const showDebugToast = (message: string, title?: string) => {
  toast({
    title: title || 'Debug',
    description: message,
    variant: 'default',
    className: 'bg-yellow-500 text-black',
  })
}
