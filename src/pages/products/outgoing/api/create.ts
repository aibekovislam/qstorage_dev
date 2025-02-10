import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { ProductsOutgoingTypes } from '../types'

export const createProduct = async (body: ProductsOutgoingTypes.Table) => {
  return axiosRequest.post('/incomings/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    body: body,
  })
}
