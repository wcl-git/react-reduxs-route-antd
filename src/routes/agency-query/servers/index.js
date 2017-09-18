import {request} from 'zcy-common';

export const getFormDataApi = (params)=>{
  return request('/agencymng/ageorganic/list',{
    method: 'get',
    params,
  })
}

export const removeFormDataApi = (params)=>{
  return request('/agencymng/agebranch/delete',{
    method: 'get',
    params
  })
}
