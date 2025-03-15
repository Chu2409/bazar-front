import { IdentificationType } from './identification-type'

export interface Identification {
  id: number
  type: IdentificationType
  value: string
  active: boolean
}
