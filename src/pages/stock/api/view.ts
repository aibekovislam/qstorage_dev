import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getStock = async () => {
  return axiosRequest.get('/products/stock', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
