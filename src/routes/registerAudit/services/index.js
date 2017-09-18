import { request } from 'zcy-common'

//获得专职人员详情
export const professionalDetail = params => {
  return request(`/agencymng/ageprofessional/detail`, params)
}
