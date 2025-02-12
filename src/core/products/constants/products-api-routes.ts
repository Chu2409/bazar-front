const MAIN_ROUTE = '/products'

export const PRODUCTS_API_ROUTES = {
  FIND_ALL: `${MAIN_ROUTE}`,
  TOGGLE_STATUS: (id: number) => `${MAIN_ROUTE}/${id}/toggle-status`,
} as const
