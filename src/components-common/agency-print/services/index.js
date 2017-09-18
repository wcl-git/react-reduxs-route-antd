import { request } from 'zcy-common'

export const agencyPrintAPI = () => {
  return request('/agencymng/ageorganic/template')
}
