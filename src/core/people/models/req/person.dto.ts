import { IdentificationDto } from '../../../identifications/models/req/identification.dto'

export interface PersonDto {
  email: string
  firstName: string
  secondName?: string
  firstSurname: string
  secondSurname?: string
  phoneNumbers: string[]
  identifications: IdentificationDto[]
}
