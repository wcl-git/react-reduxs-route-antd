import { specificListApi, specificListDeleteApi } from '../services'
const nameSpace = 'CERTIFICATE/';
export const GET_SPECIFIC_DATA = nameSpace + 'SPECIFIC/GET'
export const DELETE_SPECIFIC_DATA = nameSpace + 'SPECIFIC/DELETE'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
// 数据获取
export const getSpecificList = params => {
  return dispatch => {
    return specificListApi(params).then(res => {
      dispatch(ACTION_CREATOR(GET_SPECIFIC_DATA, res))
    })
  }
}

export const specificListDelete = params => {
  return dispatch => {
    return specificListDeleteApi(params).then(res => {
      dispatch(ACTION_CREATOR(GET_SPECIFIC_DATA, res))
    })
  }
}

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_SPECIFIC_DATA]: (state, action) => {
    return {
      ...state,
      tableList: action.payload.data,
      total: action.payload.total
    }
  },
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
