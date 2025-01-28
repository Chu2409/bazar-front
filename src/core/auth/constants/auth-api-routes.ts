const MAIN_ROUTE = '/auth'

export const AUTH_API_ROUTES = {
  SIGN_IN: `${MAIN_ROUTE}/sign-in`,
  LOGOUT: `${MAIN_ROUTE}/logout`,
  SIGNUP: `${MAIN_ROUTE}/signup`,
} as const
