import { NextResponse } from 'next/server'

import { TokenManager } from '@/shared/utils/token-manager'

export async function GET() {
  try {
    const access = await TokenManager.getAccessToken()
    const refresh = await TokenManager.getRefreshToken()

    return NextResponse.json({ access, refresh })
  } catch (error) {
    return NextResponse.json({ detail: 'get tokens failed', error: error }, { status: 500 })
  }
}
