import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProductsIncomingList = async () => {
  return axiosRequest.get('/incomings/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
