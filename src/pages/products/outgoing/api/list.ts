import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProductsOutgoingList = async () => {
  return axiosRequest.get('/outgoings/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
