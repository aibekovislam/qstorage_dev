import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsTypes } from '../../items/types'

export const getProductsOutgoingList = async (page: number = 1) => {
  return axiosRequest.get(`/outgoings/?page=${page}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductSearchedList = async (search: string | undefined) => {
  return axiosRequest.get(`/products/?search=${search}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const createProductOutgoing = async (body: FormData) => {
  return axiosRequest.post('/outgoings/', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductOutgoingProject = async () => {
  return axiosRequest.get('/project/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getUsersByProject = async (id: number) => {
  return axiosRequest.get('/users/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    params: {
      project_id: id,
    },
  })
}

export const createProduct = async (body: ProductsTypes.Item) => {
  return axiosRequest.post('/products/', body, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
