import { ReadonlyURLSearchParams } from 'next/navigation'
import qs from 'query-string'
import { IPaginationParams } from '../types/pagination'

export const DEFAULT_PAGE_LIMIT = 10

export const getPaginationParams = (params: IPaginationParams) => {
  const page = Math.max(1, Number(params?.page) || 1)
  const limit = Math.max(1, Number(params?.limit) || DEFAULT_PAGE_LIMIT)
  const skip = (page - 1) * limit

  return {
    skip,
    page,
    limit,
  }
}

export const formUrlQuery = ({
  params,
  key,
  value,
}: {
  params: ReadonlyURLSearchParams
  key: string
  value: string | null
}) => {
  const currentUrl = qs.parse(params.toString())

  currentUrl[key] = value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export const formUrlQueryFromArray = ({
  params,
  values,
}: {
  params: ReadonlyURLSearchParams
  values: {
    key: string
    value: string
  }[]
}) => {
  const currentUrl = qs.parse(params.toString())

  values.forEach(({ key, value }) => {
    currentUrl[key] = value
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export const formUrlArrayQuery = ({
  params,
  key,
  value,
}: {
  params: ReadonlyURLSearchParams
  key: string
  value: string
}) => {
  const currentUrl = qs.parse(params.toString())

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  currentUrl[key] = currentUrl[key] ? Array.of(currentUrl[key], value) : value

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: {
  params: ReadonlyURLSearchParams
  keysToRemove: string[]
}) => {
  const currentUrl = qs.parse(params.toString())

  keysToRemove.forEach((key) => {
    delete currentUrl[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export const removeValueFromArrayQuery = ({
  params,
  keyToRemove,
  valueToRemove,
}: {
  params: ReadonlyURLSearchParams
  keyToRemove: string
  valueToRemove: string
}) => {
  const currentUrl = qs.parse(params.toString())
  const values = currentUrl[keyToRemove]

  if (typeof values === 'string') {
    delete currentUrl[keyToRemove]
  }

  if (typeof values === 'object') {
    const newValues = values?.filter((value) => value !== valueToRemove)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    currentUrl[keyToRemove] = Array.of(newValues)
  }

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export const removeValueFromQuery = ({
  params,
  key,
}: {
  params: ReadonlyURLSearchParams
  key: string
}) => {
  const currentUrl = qs.parse(params.toString())

  delete currentUrl[key]

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}

export const removeAllExceptKeysFromQuery = ({
  params,
  keys,
}: {
  params: ReadonlyURLSearchParams
  keys: string[]
}) => {
  const currentUrl = qs.parse(params.toString())

  Object.keys(currentUrl).forEach((key) => {
    if (!keys.includes(key)) {
      delete currentUrl[key]
    }
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true },
  )
}
