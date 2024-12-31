import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from './src/shared/utils/token-manager/consts'

const publicRoutes = [
  '/auth',
  '/',
]

export async function middleware(request: NextRequest) {
  const allCookies = await cookies()
  const accessToken = allCookies.get(ACCESS_TOKEN_COOKIE_KEY)?.value
  const refreshToken = allCookies.get(REFRESH_TOKEN_COOKIE_KEY)?.value

  // Если нет refreshToken но есть accessToken, и пользователь пытается зайти на /login, редиректим на /dashboard
  // В случае если refreshToken как-то удалили, но у нас остался accessToken
  if (!refreshToken && accessToken && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/products/arrivals', request.url))
  }

  // Если пользователь имеет refreshToken и пытается зайти на страницу /login, редиректим на /dashboard
  // Потому что accessToken можно обновить
  if (refreshToken && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/products/arrivals', request.url))
  }

  // Если нет ни accessToken ни refreshToken, и пользователь пытается зайти в приватные роуты, редиректим на /login
  // Тут уже ничего не поделаешь
  if (!refreshToken && !accessToken && request.nextUrl.pathname !== '/auth' || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // Продолжаем работать, если условия не были выполнены
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
