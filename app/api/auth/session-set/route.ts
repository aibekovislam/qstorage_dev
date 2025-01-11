import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { encrypt } from '@/shared/lib/session'

export async function POST(req: NextRequest) {
  try {
    const { access } = await req.json()
    const cookieStore = await cookies()

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`,
      },
    })

    const data = await response.json()
    const expires = Math.floor(Date.now() / 1000) + 60 * 60 * 24
    const session = await encrypt({ data, expires })

    cookieStore.set('session', session, {
      httpOnly: true,
    })

    return NextResponse.json({ success: true, data: session })
  } catch (error) {
    console.log('error users me', error)

    return NextResponse.json({ success: false, message: error })
  }
}
