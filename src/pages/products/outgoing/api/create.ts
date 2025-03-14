import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsTypes } from '../../items/types'

export const getProductsIncomingList = async (page: number = 1) => {
  return axiosRequest.get(`/incomings/?page=${page}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductSearchedList = async (search?: string | undefined) => {
  if (search) {
    return axiosRequest.get(`/products/?search=${search}`, {
      baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    })
  } else {
    return axiosRequest.get('/products/', {
      baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    })
  }
}

export const createProductOutgoing = async (body: FormData) => {
  return axiosRequest.post('/outgoings/', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductIncomingProject = async () => {
  return axiosRequest.get('/project/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getUsers = async () => {
  return axiosRequest.get('/users/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const createProduct = async (body: ProductsTypes.Item) => {
  return axiosRequest.post('/products/', body, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductsColors = async () => {
  return axiosRequest.get('/products/colors/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
