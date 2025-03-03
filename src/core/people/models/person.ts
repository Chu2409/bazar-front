import { IIdentification } from './identification'

export interface IPerson {
  id: number
  email: string
  firstName: string
  secondName: string | null
  firstSurname: string
  secondSurname: string | null
  phoneNumbers: string[]
}

export interface IPersonWithIdentifications extends IPerson {
  identifications: IIdentification[]
}
