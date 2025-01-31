/* eslint-disable no-console */
// Constante para la key del token
const TOKEN_KEY = 'myapp_token'

// Verificar si estamos en el cliente
const isBrowser = () => typeof window !== 'undefined'

export const tokenStorage = {
  // Guardar el token
  setToken: (token: string): boolean => {
    try {
      if (isBrowser()) {
        localStorage.setItem(TOKEN_KEY, token)
        return true
      }
      return false
    } catch (error) {
      console.error('Error guardando el token:', error)
      return false
    }
  },

  // Obtener el token
  getToken: (): string | null => {
    try {
      if (isBrowser()) {
        return localStorage.getItem(TOKEN_KEY)
      }
      return null
    } catch (error) {
      console.error('Error obteniendo el token:', error)
      return null
    }
  },

  // Eliminar el token
  removeToken: (): boolean => {
    try {
      if (isBrowser()) {
        localStorage.removeItem(TOKEN_KEY)
        return true
      }
      return false
    } catch (error) {
      console.error('Error eliminando el token:', error)
      return false
    }
  },

  // Verificar si existe un token
  hasToken: (): boolean => {
    try {
      if (isBrowser()) {
        const token = localStorage.getItem(TOKEN_KEY)
        return !!token
      }
      return false
    } catch (error) {
      console.error('Error verificando el token:', error)
      return false
    }
  },

  // Método adicional para obtener el token como Bearer
  getBearerToken: (): string | null => {
    const token = tokenStorage.getToken()
    return token ? `Bearer ${token}` : null
  },
}
