import request from '../../request'

export const getAgencyAuditInfoApi = (params) => {
  return request('/agencymng/ageapproval/tags', {
    params: {
      ...params
    }
  })
}
