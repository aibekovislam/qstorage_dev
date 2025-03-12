import Cookies from 'js-cookie'

import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from './consts'

export namespace TokenManagerClient {
    export const getAccessToken = async () => {
      return Cookies.get(ACCESS_TOKEN_COOKIE_KEY)
    }

    export const setAccessToken = async (token: string) => {
      Cookies.set(ACCESS_TOKEN_COOKIE_KEY, token, {
        expires: 3600,
      })
    }

    export const deleteAccessToken = async () => {
      Cookies.remove(ACCESS_TOKEN_COOKIE_KEY)
    }

    export const getRefreshToken = async (): Promise<string | undefined> => {
      return Cookies.get(REFRESH_TOKEN_COOKIE_KEY)
    }

    export const setRefreshToken = async (token: string) => {
      Cookies.set(REFRESH_TOKEN_COOKIE_KEY, token, {
        expires: 2678400,
      })
    }

    export const deleteRefreshToken = async () => {
      return Cookies.remove(REFRESH_TOKEN_COOKIE_KEY)
    }

    export const deleteAllTokens = async () => {
      deleteAccessToken()
      deleteRefreshToken()
    }
}
