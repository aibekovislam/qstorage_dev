import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { WarehouseTypes } from '../types'

export const createWarehouse = async (data: WarehouseTypes.Item) => {
  return axiosRequest.post('/warehouses/', data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
