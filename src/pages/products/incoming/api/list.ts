import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProductsIncomingList = async () => {
  return axiosRequest.get('/incomings/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductSearchedList = async (search: string | undefined) => {
  return axiosRequest.get(`/products/?search=${search}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const createProductIncoming = async (body: FormData) => {
  return axiosRequest.post('/incomings/', body, {
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

export const getUsersByProject = async (id: number) => {
  return axiosRequest.get('/users/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    params: {
      project_id: id,
    },
  })
}
