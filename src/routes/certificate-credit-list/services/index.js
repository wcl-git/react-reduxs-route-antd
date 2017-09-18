import { request } from 'zcy-common'

//解聘专职人员
export const creditListApi = params => {
  return request(`/agencymng/agequalification/credit/list`, {
    params: {
      ...params
    }
  })
}

export const creditListDeleteApi = params => {
  const { pageNo, pageSize, id } = params
  return request(`/agencymng/agequalification/delete`, {
    params: {
      id
    }
  }).then((res) => {
    return request(`/agencymng/agequalification/credit/list`, {
      params: {
        pageNo,
        pageSize
      }
    })
  })
}
