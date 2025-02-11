import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsTypes } from '../types'

export const createProduct = async (body: ProductsTypes.Item) => {
  return axiosRequest.post('/products/', body, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const getProductItemsCategories = async () => {
  return axiosRequest.get('/categories/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
