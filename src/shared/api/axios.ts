'use server'

import axios, { AxiosError } from 'axios'

import { TokenManager } from '@/shared/utils/token-manager'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const axiosRequest = axios.create({
  baseURL,
})

axiosRequest.interceptors.request.use(
  async (config) => {
    const token = await TokenManager.getAccessToken()

    if (token)
      config.headers['Authorization'] = `Bearer ${token}`

    return config
  },
  (error) => Promise.reject(error),
)

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refresh = await TokenManager.getRefreshToken()

    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axios.post<{ access: string, refresh: string }>(`${baseURL}/auth/token/refresh/`, {
          refresh: refresh,
        })

        if (response) {
          const setToken = async () => {
            'use server'
            await TokenManager.setAccessToken(response.data.access)
            await TokenManager.setRefreshToken(response.data.refresh)
          }

          setToken()

          originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`

          return axiosRequest(originalRequest)
        }
      } catch (e: any) {
        const error = e as AxiosError

        console.log('refresh token error', error)
      }
    }

    return error
  },
)
