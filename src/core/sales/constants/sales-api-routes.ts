const MAIN_ROUTE = '/sales'

export const SALES_API_ROUTES = {
  FIND_ALL: `${MAIN_ROUTE}`,
  CREATE: `${MAIN_ROUTE}`,
  UPDATE: (id: number) => `${MAIN_ROUTE}/${id}`,
} as const
