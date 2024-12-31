import { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

import { axiosRequest } from '@/shared/api/axios'
import { TokenManager } from '@/shared/utils/token-manager'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data } = await axiosRequest.post<{ access: string, refresh: string }>('/auth/login/', body)

    const response = NextResponse.json({ success: true, data })

    TokenManager.setAccessToken(data.access)
    TokenManager.setRefreshToken(data.refresh)

    return response
  } catch (e) {
    const error = e as AxiosError
    const data = error

    return NextResponse.json(data, { status: 500 })
  }
}
