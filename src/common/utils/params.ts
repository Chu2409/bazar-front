import { ReadonlyURLSearchParams } from 'next/navigation'

export const getAllParams = (searchParams: ReadonlyURLSearchParams) => {
  const params: {
    [key: string]: string | string[]
  } = {}
  searchParams.forEach((value, key) => {
    // Si el parámetro ya existe, conviértelo en array
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
