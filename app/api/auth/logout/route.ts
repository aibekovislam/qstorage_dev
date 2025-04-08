import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/shared/utils/token-manager/consts'

export async function POST() {
  try {
    const cookieStore = await cookies()

    cookieStore.delete(ACCESS_TOKEN_COOKIE_KEY)
    cookieStore.delete(REFRESH_TOKEN_COOKIE_KEY)
    cookieStore.delete('session')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.log('error logout', error)

    return NextResponse.json({ success: false, message: error })
  }
}
