import { PersonDto } from '@/core/people/models/req/person.dto'

export interface CustomerDto {
  person: PersonDto
  address?: string
  active?: boolean
}
