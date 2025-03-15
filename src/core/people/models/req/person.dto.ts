import { IdentificationDto } from './identification.dto'

export interface PersonDto {
  email: string
  firstName: string
  secondName?: string
  firstSurname: string
  secondSurname?: string
  phoneNumbers: string[]
  identifications: IdentificationDto[]
}
