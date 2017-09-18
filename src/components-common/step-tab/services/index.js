import { request } from 'zcy-common'

export const initializeProgress = () => {
  return request('/agencymng/ageinitialize/progress')
}
