/**
 * Created by chenkaixia on 2017/6/19.
 */
import {request, Address} from 'zcy-common';


export const getFormDataApi = (params) => {
  return request('/api/test/getFormData', {
    method: 'get',
    data: params
  })
}
export const setDataApi = (params) => {
  let data = {}
  return request('/api/test/getFormData', {
    method: 'post',
    data: params
  }).then((res) => {
    data = res;
    return Address.getOptionsTree("address", res.area)
  }).then((options) => {
    data.options = [...options];
    return data
  })
}
