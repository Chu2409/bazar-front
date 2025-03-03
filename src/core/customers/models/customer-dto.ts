import { IPersonReq } from '@/core/people/models/person-dto'

export interface ICustomerReq {
  person: IPersonReq
  address?: string
  active?: boolean
}
