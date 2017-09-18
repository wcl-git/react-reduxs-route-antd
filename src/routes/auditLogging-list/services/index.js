import { request } from 'zcy-common'

//审批记录列表
export const approvalList = () => {
  return request(`/agencymng/ageorganic/approval/list`)
}

//撤销审批
// todo 400
export const ageorganicCancel = params => {
  return request(`/agencymng/ageorganic/cancel`).then(() => {
    return approvalList({})
  })
}
