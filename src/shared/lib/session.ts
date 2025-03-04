'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

import { LoginTypes } from '@/pages/auth/types'

import { TokenManager } from '../utils/token-manager'

const secretKey = process.env.SECRET_KEY
const key = new TextEncoder().encode(secretKey)
const BASE_URL = process.env.NEXT_PUBLIC_COMPANY_BASE_URL

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    })

    return payload
  } catch (error: any) {
    return error.code
  }
}

export async function loginSession(loginData: LoginTypes.Form) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })

    const data = await response.json()

    if (data.detail === 'No active account found with the given credentials') {
      return {
        success: false,
        ...data,
      }
    }

    await TokenManager.setAccessToken(data.access)
    await TokenManager.setRefreshToken(data.refresh)

    const user = data.user
    const session = await encrypt({ user })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
      httpOnly: true,
    })

    return {
      success: true,
      ...data,
    }
  } catch (error) {
    console.error('Error in loginSession:', error)
    throw error
  }
}

export async function logout() {
  const cookieStore = await cookies()

  cookieStore.set('session', '')
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value

  if (!session) return null

  const decryptedSession = await decrypt(session)

  return decryptedSession
}

export async function refreshTokens(refresh_token: string) {
  try {
    const response = await fetch(`${BASE_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refresh_token,
      }),
    })

    const data = await response.json()

    await TokenManager.setAccessToken(data.access)
    await TokenManager.setRefreshToken(data.refresh)

    return data
  } catch (error) {
    console.log('refresh tokens error', error)
  }
}
