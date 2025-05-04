import { PersonWithIdentifications } from '@/core/people/models/res/person'

export interface Customer {
  id: number
  address: string | null
  person: PersonWithIdentifications
  active: boolean
}
