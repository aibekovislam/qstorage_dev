import axios, { AxiosError } from 'axios'
import Cookie from 'js-cookie'

import { TokenManager } from '../utils/token-manager'
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '../utils/token-manager/consts'

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
    const refresh = await TokenManager.getRefreshToken()

    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post<{ access: string, refresh: string }>(`${baseURL}/auth/token/refresh/`, {
          refresh: refresh,
        })

        if (response) {
          const setToken = () => {
            Cookie.set(ACCESS_TOKEN_COOKIE_KEY, response.data.access)
            Cookie.set(REFRESH_TOKEN_COOKIE_KEY, response.data.refresh)
          }

          setToken()

        originalRequest.headers['Authorization'] = `Bearer ${data.access}`

        return axiosRequest(originalRequest)

      } catch (e) {
        const error = e as AxiosError

        console.log(error)
      }
    }

    return Promise.reject(error)
  },
)
