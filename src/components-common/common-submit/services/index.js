import { request } from 'zcy-common'

export const agencySubmitApi = () => {
  return request('/agencymng/ageorganic/submit')
}

export const approvalSubmitApi = (params) => {
  let { auditParams, approvalId } = params
  return request('/agencymng/ageapproval/dispose', {
    method: 'post',
    data: {
      id: 579,
      workFlowNode: 'APPROVAL_FIRST_NUAGREE',
      tags: JSON.stringify(auditParams)
    }
  })
}
