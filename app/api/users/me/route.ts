import { NextResponse } from 'next/server'

import { axiosRequest } from '@/shared/api/axios'

export async function GET() {
  try {
    const { data } = await axiosRequest.get('/users/me/')

    return NextResponse.json({ success: true, data: data })
  } catch (error) {
    console.log('error', error)

    return NextResponse.json({ success: false, message: error })
  }
}
