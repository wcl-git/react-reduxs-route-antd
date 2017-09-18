/**
 * Created by chenkaixia on 2017/6/19.
 */
import {request} from 'zcy-common';

function transformData(data) {
  let result = {};
  for (let key in data) {
    result[key] = {
      value: data[key]
    }
  }
  return result
}

export const getCertificateApi = (params) => {
  return request('/agencymng/agecertificate/list', {
    params: {
      ...params
    }
  }).then((res) => {
    if (!res || !Array.isArray(res)) {
      return {}
    }
    let data = {}
    data.type = res[0].type
    res.map((obj, index) => {
      switch (obj.certificateType) {
        case '1':
          data.organizationData = transformData(obj);
          break;
        case '2':
          data.businessData = transformData(obj);
          break;
        case '4':
          data.taxData = transformData(obj);
          break;
        case '7':
          data.InsuranceData = transformData(obj);
          break;
      }
    })
    return data
  })
}

export const updateCertificateApi = (params) => {
  debugger
  return request('/agencymng/agecertificate/update', {
    method: 'post',
    data: {
      data: params
    }
  })
}