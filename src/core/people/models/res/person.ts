import { Identification } from '../../../identifications/models/res/identification'

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
