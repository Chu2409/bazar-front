import { IOption } from '../types/filters'

export const STATUSES: {
  [key: string]: IOption
} = {
  ACTIVE: { id: 1, label: 'Activo' },
  INACTIVE: { id: 0, label: 'Inactivo' },
} as const

export const STATUSES_OPTIONS = Object.values(STATUSES)

export const getStatusById = (id: number) =>
  STATUSES_OPTIONS.find((type) => type.id === id)

export const getStatusByLabel = (label: string) =>
  STATUSES_OPTIONS.find(
    (type) => type.label.toLowerCase() === label.toLowerCase(),
  )
