import { request } from 'zcy-common'

//批量添加专职人员
export const addBatchProfessional = params => {
  let {userIds, pageSize} = params;
  return request(`/agencymng/ageprofessional/batch/add`, {
    method: 'get',
    params: {
      userIds: userIds.join(',')
    }
  })
}

//获得机构用户列表
export const professionalUserList = params => {
  return request(`/agencymng/ageprofessional/user/list`, {
    method: 'get',
    params: {
      ...params
    }
  })
}
