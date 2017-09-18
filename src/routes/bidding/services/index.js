import { request, Address } from 'zcy-common'

function transformData(data) {
  let result = {}
  for (let key in data) {
    result[key] = {
      value: data[key]
    }
  }
  return result
}

//开评标场地详细
export const biddingDetail = params => {
  return request(`/agencymng/agebidding/detail`, {
    params: { ...params }
  }).then(res => {
    let AGE_SITE_PHOTO = {
      value: res.filemanageMaps.AGE_SITE_PHOTO //array<object>
    }
    let combineArea = {
      value: [res.siteProv, res.siteCity, res.siteDist]
    }

    let data = transformData(res)
    delete data.filemanageMaps

    return {
      ...data,
      combineArea,
      AGE_SITE_PHOTO
    }
  })
}

//保存开评标场地
export const biddingSave = params => {
  return request(`/agencymng/agebidding/save`, {
    method: 'post',
    data: params
  })
}
