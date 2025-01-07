import axios, { AxiosError } from 'axios'

import { TokenManager } from '../utils/token-manager'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const axiosRequest = axios.create({
  withCredentials: true,
  baseURL: baseURL,
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
    const refreshToken = await TokenManager.getRefreshToken()
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await fetch('http://localhost:3000/api/refresh/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ refresh_token: refreshToken }),
        })

        if (!response.ok) {
          throw new Error(`Refresh token request failed with status: ${response.status}`)
        }

        const refreshResponse = await response.json()

        originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.access}`

        return axiosRequest(originalRequest)
      } catch (e) {
        const error = e as AxiosError

        console.log(error)
      }
    }

    return Promise.reject(error)
  },
)
