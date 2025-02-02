export interface ITableFilter {
  key: string
  values: IOption[]
  getById: (id: number) => IOption | undefined
}

export interface IOption {
  id: number
  label: string
}
