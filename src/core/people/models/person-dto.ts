import { IIdentificationReq } from './identification-dto'

export interface IPersonReq {
  email: string
  firstName: string
  secondName?: string
  firstSurname: string
  secondSurname?: string
  phoneNumbers: string[]
  identifications: IIdentificationReq[]
}
