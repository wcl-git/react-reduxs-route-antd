import { addBatchProfessional, professionalUserList } from '../services'

export const GET_DATA = 'PROFESSIONALUSERLIST/GET'
export const SET_DATA = 'PROFESSIONALUSERLIST/SET'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
// 数据获取
export const addProfessional = params => {
  return dispatch => {
    return addBatchProfessional(params)
  }
}

export const getProfessionalUserList = params => {
  return dispatch => {
    return professionalUserList(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return {
      ...state,
      professionalUserList: action.payload,
      total: action.payload.length
    }
  }
}

const initialState = {
  professionalUserList: [],
  total: 0,
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
