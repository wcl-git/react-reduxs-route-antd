import { request } from 'zcy-common'

export const agencyAuditStatus = () => {
  return request('/agencymng/ageinitialize/approval/progress')
}
