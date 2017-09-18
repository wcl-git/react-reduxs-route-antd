import { request } from 'zcy-common'

// 审核说明
export const auditOrganic = () => {
  return request('/agencymng/ageorganic/auditOrganic')
}
