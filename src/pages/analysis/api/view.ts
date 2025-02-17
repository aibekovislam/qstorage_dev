import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import { AnalysisType } from '../types'

export const getAnalysis = async ({ type, interval, start_date, end_date }: AnalysisType.AnalysisParams) => {
  return axiosRequest.get('analytics', {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
    params: {
      type,
      interval,
      start_date,
      end_date,
    },
  })
}
