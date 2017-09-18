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

//出资人详细
export const investorDetail = params => {
  return request(`/agencymng/ageinvestor/detail`, {
    params: { 
      ...params 
    }
  }).then(res => {
    let data = transformData(res)
    data.investAmount && (data.investAmount.value /= 1000000 || undefined)

    return data
  })
}

//保存出资人
export const investorSave = data => {
  return request('/agencymng/ageinvestor/save', { method: 'post', data })
}

// 币种
export const metaCurrency = () => {
  return request('/agencymng/meta/currency')
}
