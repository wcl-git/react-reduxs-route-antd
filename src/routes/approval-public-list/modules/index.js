import { approvalPublicList, disposeApi } from '../services'

export const GET_DATA = 'APPROVALPUBLICLIST/GET'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
// 数据获取
export const getApprovalPublicList = params => {
  return dispatch => {
    return approvalPublicList(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

export const dispose = params => {
  return dispatch => {
    return disposeApi(params)
  }
}

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return {
      ...state,
      approvalPublicList: action.payload.data,
      total: action.payload.total
    }
  }
}

const initialState = {
  approvalPublicList: [],
  total: 0
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
