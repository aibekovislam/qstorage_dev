import { NextResponse } from 'next/server'

import { TokenManager } from '@/shared/utils/token-manager'

export async function POST() {
  try {
    TokenManager.deleteAllTokens()

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error(e)

    return NextResponse.json({ success: false })
  }
}
