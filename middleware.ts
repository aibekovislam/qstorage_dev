import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from './src/shared/utils/token-manager/consts'

const publicRoutes = [
  '/auth',
  '/',
  '/products/arrivals',
]

export async function middleware(request: NextRequest) {
  const allCookies = await cookies()
  const accessToken = allCookies.get(ACCESS_TOKEN_COOKIE_KEY)?.value
  const refreshToken = allCookies.get(REFRESH_TOKEN_COOKIE_KEY)?.value

  // if (!refreshToken && accessToken && publicRoutes.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL('/products/arrivals', request.url))
  // }

  // if (refreshToken && publicRoutes.includes(request.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL('/products/arrivals', request.url))
  // }

  if (!refreshToken && !accessToken && request.nextUrl.pathname !== '/auth' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
