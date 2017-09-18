import { creditListApi, creditListDeleteApi } from '../services'
const nameSpace = 'CERTIFICATE/';
export const GET_CREDIT_DATA = nameSpace + 'CREDIT/GET'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
export const getCreditList = params => {
  return dispatch => {
    return creditListApi(params).then(res => {
      dispatch(ACTION_CREATOR(GET_CREDIT_DATA, res))
    })
  }
}

export const creditListDelete = params => {
  return dispatch => {
    return creditListDeleteApi(params).then(res => {
      dispatch(ACTION_CREATOR(GET_CREDIT_DATA, res))
    })
  }
}

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_CREDIT_DATA]: (state, action) => {
    return {
      ...state,
      tableList: action.payload.data,
      total: action.payload.total
    }
  }
}

const initialState = {
  tableList: [],
  total: 0
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
