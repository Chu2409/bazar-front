'use server'

import { TOKEN_KEY } from '@/constants/cookies'
import { cookies } from 'next/headers'

const TOKEN_OPTIONS = {
  maxAge: 7 * 24 * 60 * 60, // 7 días
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  sameSite: 'strict' as const,
  path: '/',
}

export const setToken = async (token: string) => {
  const cookieStore = await cookies()
  cookieStore.set(TOKEN_KEY, token, TOKEN_OPTIONS)
}

export const getToken = async (): Promise<string | null> => {
  const cookieStore = await cookies()
  const token = cookieStore.get(TOKEN_KEY)?.value
  return token || null
}

export const removeToken = async () => {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_KEY)
}

export const hasToken = async (): Promise<boolean> => {
  const cookieStore = await cookies()
  return cookieStore.has(TOKEN_KEY)
}
