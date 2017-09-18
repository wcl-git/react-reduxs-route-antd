import { professionalList, professionalDismiss } from '../services'

export const GET_DATA = 'PROFESSIONALLIST/GET'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
// 数据获取
export const getProfessionalList = params => {
  return dispatch => {
    return professionalList(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

export const dismissProfessional = params => {
  return dispatch => {
    return professionalDismiss(params)
  }
}

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return {
      ...state,
      professionalList: action.payload.data,
      total: action.payload.total
    }
  }
}

const initialState = {
  professionalList: [],
  total: 0,
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
