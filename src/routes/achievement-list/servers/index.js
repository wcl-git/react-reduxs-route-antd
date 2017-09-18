/**
 * Created by chenkaixia on 2017/6/19.
 */
import { request } from 'zcy-common';

//请求数据
export const getFormDataApi = (params) => {
  return request('/agencymng/ageperformance/list', {
    method: 'get',
    params
  })
}

//删除后请求数据
export const removeFormDataApi = (params) => {
  const { id } = params
  return request('/agencymng/ageperformance/delete', {
    method: 'get',
    params: { id }
  }).then(() => getFormDataApi())
}

//撤销
export const widthdraw = (params) => {
  return request('/agencymng/ageorganic/cancel', {
    method: 'get'
  })
}