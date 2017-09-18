import { request } from 'zcy-common'

//获得专职人员详情
export const approvalPublicList = params => {
  return request(`/agencymng/ageapproval/list`, {
    params: {
      ...params
    }
  })
}

export const disposeApi = params => {
  return request(`/agencymng/ageapproval/dispose`, {
    method: 'post',
    data: {
      ...params
    }
  })
}
