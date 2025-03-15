const MAIN_ROUTE = '/categories'

export const CATEGORIES_API_ROUTES = {
  FIND_ALL: `${MAIN_ROUTE}`,
  GET_BY_SEARCH: `${MAIN_ROUTE}/search`,
  CREATE: `${MAIN_ROUTE}`,
  UPDATE: (id: number) => `${MAIN_ROUTE}/${id}`,
  TOGGLE_STATUS: (id: number) => `${MAIN_ROUTE}/${id}/toggle-status`,
} as const
