import { request } from 'zcy-common';

export const getFormDataApi = (params) => {
  return request('/agencymng/agefinance/list', {
    method: 'get',
    params: {
      ...params
    }
  })
}

export const removeFormDataApi = (params) => {
  return request('/agencymng/agefinance/delete', {
    method: 'get',
    params
  }).then(()=> getFormDataApi())
}
