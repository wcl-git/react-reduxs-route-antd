import { request } from 'zcy-common'

function transformData(data) {
  let result = {}
  for (let key in data) {
    result[key] = {
      value: data[key]
    }
  }
  return result
}

// 公示配置列表
export const ageauditconfigList = () => {
  return request('/agencymng/ageauditconfig/list').then(res => {
    const register = JSON.parse(res[0].content || {})
    let registerConf = Object.assign(
      {},
      register.data,
      { isNotice: register.isNotice },
      { id: res[0].id }
    )

    registerConf = transformData(registerConf)

    const modify = JSON.parse(res[1].content || {})
    let modifyConf = Object.assign(
      {},
      modify.data,
      { isNotice: modify.isNotice },
      { id: res[1].id }
    )

    modifyConf = transformData(modifyConf)

    return {
      registerConf,
      modifyConf
    }
  })
}

// 保存公示配置
export const auditconfigSave = data => {
  return request('/agencymng/ageauditconfig/save', {
    method: 'post',
    data
  })
}
