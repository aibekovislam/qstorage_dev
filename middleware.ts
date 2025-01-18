import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { REFRESH_TOKEN_COOKIE_KEY } from './src/shared/utils/token-manager/consts'

export async function middleware(request: NextRequest) {
  const allCookies = await cookies()
  const refreshToken = allCookies.get(REFRESH_TOKEN_COOKIE_KEY)?.value

  const isAuthenticated = Boolean(refreshToken)
  const path = request.nextUrl.pathname

  if (isAuthenticated && path === '/auth') {
    return NextResponse.redirect(new URL('/products/incoming', request.url))
  }

  if (!isAuthenticated && path !== '/auth') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
