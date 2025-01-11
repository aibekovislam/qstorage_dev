import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { encrypt, refreshTokens } from '@/shared/lib/session'

export async function POST(req: NextRequest) {
  try {
    const { refresh_token } = await req.json()
    const cookieStore = await cookies()

    const session = cookieStore.get('session')

    const tokens = await refreshTokens(refresh_token)

    const expires = new Date(Date.now() + 10 * 1000)
    const encryptedSession = await encrypt({ session, expires })

    cookieStore.set('session', encryptedSession, { httpOnly: true })

    return NextResponse.json({ tokens: tokens, session: encryptedSession })
  } catch (error) {
    return NextResponse.json({ detail: 'Refresh failed', error }, { status: 401 })
  }
}
