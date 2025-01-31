import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsIncomingTypes } from '../types'

export const createProduct = async (body: ProductsIncomingTypes.Table) => {
  return axiosRequest.post('/incomings/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    body: body,
  })
}
