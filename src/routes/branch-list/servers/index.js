/**
 * Created by chenkaixia on 2017/6/19.
 */

import {request} from 'zcy-common';

export const getFormDataApi = (params)=>{
  return request('/agencymng/agebranch/list',{
    method: 'get',
    params: {
      ...params
    }
  })
}

export const removeFormDataApi = (params)=>{
  return request('/agencymng/agebranch/delete',{
    method: 'get',
    params
  }).then(()=>getFormDataApi())
}

export const submitApi = (params)=>{
  return request('/agencymng/agebranch/user/create',{
    method: 'post',
    data: params
  }).then(()=>getFormDataApi())
}