const MAIN_ROUTE = '/suppliers'

export const SUPPLIERS_API_ROUTES = {
  FIND_ALL: `${MAIN_ROUTE}`,
  CREATE: `${MAIN_ROUTE}`,
  UPDATE: (id: number) => `${MAIN_ROUTE}/${id}`,
  TOGGLE_STATUS: (id: number) => `${MAIN_ROUTE}/${id}/toggle-status`,
} as const
