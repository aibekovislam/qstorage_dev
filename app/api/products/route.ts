import { AxiosError } from 'axios'
import { NextResponse } from 'next/server'

import { axiosRequest } from '@/shared/api/axios'

export async function GET() {
  try {
    const response = await axiosRequest.get('/products/', {
      baseURL: 'https://magic.qstorage.bilimmotion.com',
    })

    return NextResponse.json({ success: true, data: response.data.results })
  } catch (e: any) {
    const error = e as AxiosError
    const errorData = error.response?.data

    return NextResponse.json({ success: false, error: errorData }, { status: error.response?.status || 500 })
  }
}
