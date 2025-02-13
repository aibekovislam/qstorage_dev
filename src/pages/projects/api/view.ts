import { axiosRequest } from '@/shared/api/axios'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

export const getProjectsOperationsById = async (id: number) => {
  return axiosRequest.get(`/operations/?project_id=${id}`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}

export const deleteProject = async (id: number) => {
  return axiosRequest.delete(`/project/${id}/`, {
    baseURL: NEXT_PUBLIC_COMPANY_BASE_URL,
  })
}
