import { request } from 'zcy-common'

//获得专职人员列表详情
export const professionalList = params => {
  return request(`/agencymng/ageprofessional/list`, {
    params: {
      ...params
    }
  })
}
//解聘专职人员
export const professionalDismiss = params => {
  const { pageSize, ...rest} = params
  return request(`/agencymng/ageprofessional/dismissal`, {
    method: 'post',
    data: {
      ...rest
    }
  })
}
