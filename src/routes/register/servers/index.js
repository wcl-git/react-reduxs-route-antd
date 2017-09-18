import { request } from 'zcy-common'

//保存
export const submitApi = (params) => {
  return request('/agencymng/ageorganic/register', {
    method: 'post',
    data: params
  })
}

//已是平台号码，快速注册
export const quickSubmitApi = (params) => {
  return request('/agencymng/ageorganic/registerAgency', {
    method: 'post',
    data: params
  })
}

//验证码
export const sendVerifyCodeApi = (params) => {
  return request('/api/agencymng/sendVerifyCode', {
    method: 'get',
    params
  })
}

//判断号码身份类别
export const checkUserCategorApi = (params) => {
  return request('/agencymng/ageorganic/checkUserCategor', {
    method: 'get',
    params
  })
}

//获取当前环境
export const getEnvHrefApi = (params) => {
  return request('/api/privileges/getEnvHref', {
    method: 'get',
    params
  })
}
