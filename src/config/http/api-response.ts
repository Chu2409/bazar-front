export interface IApiResponse<T> {
  success: boolean
  data: T | null
  message: IApiMessage
}
export interface IApiMessage {
  content: string[]
  displayable: boolean
}
