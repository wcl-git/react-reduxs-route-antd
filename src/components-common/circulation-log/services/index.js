import { request } from 'zcy-common'

export const agencyCirculationLog = () => {
  return request('/agencymng/ageorganic/curent/record')
}
