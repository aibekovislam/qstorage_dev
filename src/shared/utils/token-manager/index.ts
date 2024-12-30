import { cookies } from 'next/headers'

import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from './consts'

const oneDay = 60 * 60 * 24
const sevenDays = 60 * 60 * 24 * 7

export namespace TokenManager {
    export const getAccessToken = async (): Promise<string | undefined> => {
      return (await cookies()).get(ACCESS_TOKEN_COOKIE_KEY)?.value
    }

    export const setAccessToken = async (token: string) => {
      (await cookies()).set(ACCESS_TOKEN_COOKIE_KEY, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: oneDay,
        path: '/',
      })
    }

    export const deleteAccessToken = async () => {
      (await cookies()).delete(ACCESS_TOKEN_COOKIE_KEY)
    }

    export const getRefreshToken = async (): Promise<string | undefined> => {
      return (await cookies()).get(REFRESH_TOKEN_COOKIE_KEY)?.value
    }

    export const setRefreshToken = async (token: string) => {
      (await cookies()).set(REFRESH_TOKEN_COOKIE_KEY, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: sevenDays,
        path: '/',
      })
    }

    export const deleteRefreshToken = async () => {
      return (await cookies()).delete(REFRESH_TOKEN_COOKIE_KEY)
    }

    export const deleteAllTokens = async () => {
      deleteAccessToken()
      deleteRefreshToken()
    }
}
