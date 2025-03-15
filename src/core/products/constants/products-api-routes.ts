const MAIN_ROUTE = '/products'

export const PRODUCTS_API_ROUTES = {
  FIND_ALL: `${MAIN_ROUTE}`,
  CREATE: `${MAIN_ROUTE}`,
  GET_BY_SEARCH: `${MAIN_ROUTE}/search`,
  UPDATE: (id: number) => `${MAIN_ROUTE}/${id}`,
  TOGGLE_STATUS: (id: number) => `${MAIN_ROUTE}/${id}/toggle-status`,
} as const
