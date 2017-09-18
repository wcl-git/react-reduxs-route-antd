import { request } from 'zcy-common'

//获得专职人员详情
export const professionalList = params => {
  return request(`/agencymng/ageprofessional/list`, params)
}
