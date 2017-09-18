import { request } from 'zcy-common'

//获得专职人员列表详情
export const specificListApi = params => {
  return request(`/agencymng/agequalification/specific/list`, {
    params: {
      ...params
    }
  })
}

export const specificListDeleteApi = params => {
  const { pageNo, pageSize, id } = params
  return request(`/agencymng/agequalification/delete`, {
    params: {
      id
    }
  }).then((res) => {
    return request(`/agencymng/agequalification/specific/list`, {
      params: {
        pageNo,
        pageSize
      }
    })
  })
}


