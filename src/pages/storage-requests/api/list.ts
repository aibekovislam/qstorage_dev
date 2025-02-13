import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { StorageRequestsResponse } from '../types'

export const getStorageRequests = async (): Promise<StorageRequestsResponse> => {
  const response = await axiosRequest.get<StorageRequestsResponse>('/pendings/pending/', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })

  return response.data
}

export const approveRequests = async (data: { incoming_ids: number[]; outgoing_ids: number[] }): Promise<void> => {
  await axiosRequest.post('/pendings/approve/', data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const rejectRequests = async (data: { incoming_ids: number[]; outgoing_ids: number[] }): Promise<void> => {
  await axiosRequest.post('/pendings/reject/', data, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
