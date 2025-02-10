export interface IApiMessage {
  content: string[]
  displayable: boolean
}

export interface IApiRes<T> {
  success: boolean
  message: IApiMessage
  data: T | null
}
export interface IApiPaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
}

export interface IApiPaginatedRes<T> extends IApiPaginationMeta {
  records: T[]
}
