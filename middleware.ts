import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { updateSession } from '@/shared/lib/session'

import { REFRESH_TOKEN_COOKIE_KEY } from './src/shared/utils/token-manager/consts'

const publicRoutes = [
  '/',
  '/auth',
]

export async function middleware(request: NextRequest) {
  const allCookies = await cookies()
  const refreshToken = allCookies.get(REFRESH_TOKEN_COOKIE_KEY)?.value

  if (refreshToken && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/products/incoming', request.url))
  }

  if (!refreshToken && request.nextUrl.pathname !== '/auth' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return await updateSession(request)

  // return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
