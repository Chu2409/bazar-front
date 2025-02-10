import { IApiRes } from '@/config/http/api-response'
import {
  showDebugToast,
  showErrorToast,
  showSuccessToast,
} from '../utils/toast'

const isProduction = process.env.NODE_ENV === 'production'

export function useCustomToast() {
  const showToastFromResponse = <T>(response: IApiRes<T>) => {
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

  return {
    showToastFromResponse,
    showSuccessToast,
    showErrorToast,
    showDebugToast,
  }
}
