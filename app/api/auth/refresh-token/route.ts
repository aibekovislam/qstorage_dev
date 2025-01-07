import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

import { TokenManager } from '@/shared/utils/token-manager'

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken, refreshToken } = req.body

  try {
    if (accessToken) {
      TokenManager.setAccessToken(accessToken)
      TokenManager.setRefreshToken(refreshToken)
      res.status(200).json({ message: 'Tokens set successfully' })
    } else {
      res.status(400).json({ error: 'Missing tokens' })
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error })
  }
}
