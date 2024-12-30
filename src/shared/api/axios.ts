import axios from 'axios'

import { TokenManager } from '../utils/token-manager'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const axiosRequest = axios.create({
  withCredentials: true,
  baseURL: baseURL,
})

// axiosRequest.interceptors.request.use((config) => {
//   const token = TokenManager.getAccessToken()

//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`
//   }
// })
