
import { submitApi, sendVerifyCodeApi, checkUserCategorApi, quickSubmitApi, getEnvHrefApi } from '../servers'

export const submit = (params) => {
    return submitApi(params)
}
export const sendVerifyCode = (phoneNumber) => {
 return sendVerifyCodeApi(phoneNumber)
}

export const checkUserCategor = (phoneNumber) => {
 return checkUserCategorApi(phoneNumber)
}

export const quickSubmit = (params) => {
 return quickSubmitApi(params)
}

export const getEnvHref = () => {
 return getEnvHrefApi()
}


const ACTION_HANDLERS = {}

const editInitialState = {
  formData: {}
}

export default function Reducer(state = editInitialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
