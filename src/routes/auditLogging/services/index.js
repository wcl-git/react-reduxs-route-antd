import { request } from 'zcy-common'

//审批标签内容
export const agencyAuditTags = approvalId => {
  return request(`/agencymng/ageapproval/tags`, {
    params: { approvalId }
  })
}

//机构审批日志
export const agencyAuditRecord = approvalId => {
  return request(`/agencymng/ageapproval/record`, {
    params: { approvalId }
  })
}
