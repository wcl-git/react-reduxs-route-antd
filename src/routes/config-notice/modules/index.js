import { ageauditconfigList, auditconfigSave } from '../services'

export const GET_CONF = 'manageConfNotice/GET'
export const DUPLEX_DATA = 'manageConfNotice/DUPLEX_DATA'

// action creators
const ACTION_CREATOR = (type, response) => ({
  type,
  payload: response
})

export const getNoticeConf = () => {
  return dispatch => {
    return ageauditconfigList().then(res => {
      dispatch(ACTION_CREATOR(GET_CONF, res))
    })
  }
}

export const saveNoticeConf = data => {
  return dispatch => {
    return auditconfigSave(data)
  }
}

//双向绑定
export const duplexFormData = (params, key) => {
  return dispatch => {
    dispatch({
      type: DUPLEX_DATA,
      payload: params,
      key
    })
  }
}

const ACTION_HANDLERS = {
  [GET_CONF]: (state, action) => {
    return {
      ...state,
      registerConf: action.payload.registerConf,
      modifyConf: action.payload.modifyConf
    }
  },
  [DUPLEX_DATA]: (state, action) => {
    const key = action.key
    state[key] = Object.assign({}, state[key], action.payload)
    return state
  }
}

const initialState = {
  registerConf: {},
  modifyConf: {}
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
