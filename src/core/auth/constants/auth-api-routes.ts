const MAIN_ROUTE = '/auth'

export const AUTH_API_ROUTES = {
  LOGIN: `${MAIN_ROUTE}/login`,
  LOGOUT: `${MAIN_ROUTE}/logout`,
  SIGNUP: `${MAIN_ROUTE}/signup`,
} as const
