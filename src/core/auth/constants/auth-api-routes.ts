const MAIN_ROUTE = '/auth'

export const AUTH_API_ROUTES = {
  SIGN_IN: `${MAIN_ROUTE}/sign-in`,
  ME: `${MAIN_ROUTE}/me`,
} as const
