import { NextResponse } from 'next/server'

import { TokenManager } from '@/shared/utils/token-manager'

export async function GET() {
  try {
    const access = await TokenManager.getAccessToken()
    const refresh = await TokenManager.getRefreshToken()

    return NextResponse.json({ success: true, tokens: { access, refresh } })
  } catch (error) {
    console.log('refresh route failed', error)

    return NextResponse.json({ detail: 'Refresh failed', error }, { status: 500 })
  }
}
