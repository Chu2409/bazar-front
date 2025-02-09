import { TOKEN_KEY } from '@/constants/cookies'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/sign-in', '/sign-up']

export function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_KEY)?.value

  const isPublicPage = publicRoutes.includes(request.nextUrl.pathname)
  const isRootPage = request.nextUrl.pathname === '/'

  if (!token && !isPublicPage && !isRootPage) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (token && isPublicPage) {
    return NextResponse.redirect(new URL('/products', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
