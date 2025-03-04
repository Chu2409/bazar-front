import { IPersonReq } from '@/core/people/models/person-dto'

export interface IInventoryReq {
  person: IPersonReq
  address?: string
  active?: boolean
}
