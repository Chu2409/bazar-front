import { Identification } from './identification'

export interface Person {
  id: number
  email: string
  firstName: string
  secondName: string | null
  firstSurname: string
  secondSurname: string | null
  phoneNumbers: string[]
}

export interface PersonWithIdentifications extends Person {
  identifications: Identification[]
}
