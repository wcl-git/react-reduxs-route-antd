/**
 * Created by chenkaixia on 2017/6/19.
 */

import { request } from 'zcy-common';

export const getFormDataApi = (params) => {
  return request('/agencymng/ageaudit/list', {
    method: 'get',
    params
  })
}

export const removeFormDataApi = (params) => {
  return request('/agencymng/agebranch/delete', {
    method: 'get',
    params
  })
}

export const auditApi = (params) => {
  let states = null

  switch (params.state) {
    case 'agency_audit':
      states = {
        state: 'APPROVAL_ORG',
      }
      break
    case 'agency_change':
      states = {
        state: 'APPROVAL_ORG',
        approvalType: 'agency_branch_change',
      }
      break
    case 'agency_logout':
      states = {
        state: 'APPROVAL_ORG',
        approvalType: 'agency_branch_change',
      }
      break
    default:
      break
  }
  debugger
  return request('/agencymng/ageaudit/approval', {
    method: 'post',
    data: params
  }).then(() => getFormDataApi(states))
}

