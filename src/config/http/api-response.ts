export interface IApiResponse<T> {
  success: boolean
  data: T
  message: IApiMessage
}
export interface IApiMessage {
  content: string[]
  displayable: boolean
}
