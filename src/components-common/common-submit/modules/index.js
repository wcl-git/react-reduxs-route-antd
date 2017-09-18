import { agencySubmitApi, approvalSubmitApi } from '../services'

export const agencySubmit = () => {
  return dispatch => {
    return agencySubmitApi()
  }
}

export const approvalSubmit = (params) => {
  return dispatch => {
    debugger
    return approvalSubmitApi(params)
  }
}
