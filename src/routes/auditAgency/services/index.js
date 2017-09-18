import { request } from 'zcy-common'

// 审评机构信息
export const organicAuditOrganic = () => {
  return request('/agencymng/ageorganic/auditOrganic')
}

// 审评机构列表-select
export const organicAuditOrganicList = distId => {
  return request('/agencymng/ageorganic/auditOrganic/list', {
    params: { distId }
  }).then(res => {
    // console.dir(res)
    const demo = [
      {
        label: '内资',
        value: '1',
        key: '1',
        children: [
          {
            label: '国有全资',
            value: '11',
            key: '11'
          }
        ]
      }
    ]
    return demo
  })
}

// 更新审批机构
export const organicAuditOrganicUpdate = region => {
  //6位区划code
  return request('/agencymng/ageorganic/auditOrganic/update', {
    params: { region }
  })
}
