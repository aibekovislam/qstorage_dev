import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/shared/utils/token-manager/consts'

type RefreshResponse = {
  access: string
  refresh: string
}

export async function POST(req: NextRequest) {
  try {
    const { refresh_token } = await req.json()

    if (!refresh_token) {
      return NextResponse.json({ detail: 'No refresh token' }, { status: 400 })
    }

    const response = await axios.post<RefreshResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/refresh/`,
      { refresh: refresh_token },
      { withCredentials: true },
    )

    const newAccess = response.data.access
    const newRefresh = response.data.refresh

    const responseHeaders = new Headers()

    responseHeaders.append(
      'Set-Cookie',
      `${ACCESS_TOKEN_COOKIE_KEY}=${newAccess}; Path=/; HttpOnly; Max-Age=86400; ${
        process.env.NODE_ENV === 'production' ? 'Secure;' : ''
      }`,
    )

    responseHeaders.append(
      'Set-Cookie',
      `${REFRESH_TOKEN_COOKIE_KEY}=${newRefresh}; Path=/; HttpOnly; Max-Age=${7 * 24 * 60 * 60}; ${
        process.env.NODE_ENV === 'production' ? 'Secure;' : ''
      }`,
    )

    return new NextResponse(
      JSON.stringify({ access: newAccess, refresh: newRefresh }),
      { headers: responseHeaders },
    )
  } catch (error) {
    console.error('refresh token route.ts error', error)

    return NextResponse.json({ detail: 'Refresh failed' }, { status: 401 })
  }
}
