import { ReadonlyURLSearchParams } from 'next/navigation'

export const getAllParams = (searchParams: ReadonlyURLSearchParams) => {
  const params: {
    [key: string]: string | string[]
  } = {}
  searchParams.forEach((value, key) => {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        params[key].push(value)
      } else {
        params[key] = [params[key], value]
      }
    } else {
      params[key] = value
    }
  })
  return params
}
