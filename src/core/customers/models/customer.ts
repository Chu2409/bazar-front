import { IPersonWithIdentifications } from '@/core/people/models/person'

export interface ICustomer {
  id: number
  address: string | null
  personId: number
  person: IPersonWithIdentifications
  active: boolean
}
