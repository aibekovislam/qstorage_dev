import { NextRequest, NextResponse } from 'next/server'

import { TokenManager } from '@/shared/utils/token-manager'

export async function POST(req: NextRequest) {
  try {
    const { refresh_token } = await req.json()

    const tokens = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refresh_token }),
    })

    const data = await tokens.json()

    await TokenManager.setAccessToken(data.access)
    await TokenManager.setRefreshToken(data.refresh)

    return NextResponse.json({ success: true, tokens: data })
  } catch (error) {
    console.log('refresh route failed', error)

    return NextResponse.json({ detail: 'Refresh failed', error }, { status: 401 })
  }
}
