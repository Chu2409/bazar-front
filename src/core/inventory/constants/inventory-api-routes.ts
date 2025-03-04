const MAIN_ROUTE = '/inventory'

export const INVENTORY_API_ROUTES = {
  FIND_ALL: `${MAIN_ROUTE}`,
  CREATE: `${MAIN_ROUTE}`,
  DELETE: (id: number) => `${MAIN_ROUTE}/${id}`,
  UPDATE: (id: number) => `${MAIN_ROUTE}/${id}`,
  TOGGLE_STATUS: (id: number) => `${MAIN_ROUTE}/${id}/toggle-status`,
} as const
