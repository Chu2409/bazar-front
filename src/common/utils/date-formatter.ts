import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (fecha: Date) => {
  return format(fecha, 'EEE d, yyyy HH:mm', { locale: es })
}
