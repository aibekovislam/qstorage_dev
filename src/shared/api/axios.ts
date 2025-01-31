'use сlient'

import axios, { AxiosError } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL
const apiURL = process.env.NEXT_PUBLIC_API_URL

export const axiosRequest = axios.create({
  baseURL,
})

axiosRequest.interceptors.request.use(
  async (config) => {
    const response = await fetch(`${apiURL}/api/auth/get-tokens/`)

    const { tokens } = await response.json()

    if (tokens)
      config.headers['Authorization'] = `Bearer ${tokens.access}`

    return config
  },
  (error) => Promise.reject(error),
)

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const response = await fetch(`${apiURL}/api/auth/get-tokens/`)

    const { tokens } = await response.json()

    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await axios.post(`${apiURL}/api/auth/refresh/`, {
          refresh_token: tokens.refresh,
        })

        if (response) {
          originalRequest.headers['Authorization'] = `Bearer ${response.data.tokens.access}`

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
