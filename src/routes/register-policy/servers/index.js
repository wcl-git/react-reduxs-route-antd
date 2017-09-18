import { request } from 'zcy-common'

//保存
export const getEnvHrefApi = (params) => {
  return request('/api/privileges/getEnvHref', {
    method: 'get',
    params
  })
}
