import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProductsList = async () => {
  return axiosRequest.get('/products/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
