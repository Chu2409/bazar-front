import { PersonWithIdentifications } from '@/core/people/models/res/person'

export interface Customer {
  id: number
  address: string | null
  personId: number
  person: PersonWithIdentifications
  active: boolean
}
