'use client'

import axios, { AxiosError } from 'axios'

import { getTokens } from './get-tokens'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const axiosRequest = axios.create({
  baseURL,
})

axiosRequest.interceptors.request.use(
  async (config) => {
    const tokens = await getTokens()

    if (tokens.access)
      config.headers['Authorization'] = `Bearer ${tokens.access}`

    return config
  },
  (error) => Promise.reject(error),
)

axiosRequest.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refresh } = await getTokens()

    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh/`, {
          method: 'POST',
          body: JSON.stringify({ refresh_token: refresh }),
          credentials: 'include',
        })

        const { tokens } = await response.json()

        if (tokens) {
          originalRequest.headers['Authorization'] = `Bearer ${tokens.access}`

          return axiosRequest(originalRequest)
        }
      } catch (e: any) {
        const error = e as AxiosError

        console.log(error)
      }
    }

    return Promise.reject(error)
  },
)
