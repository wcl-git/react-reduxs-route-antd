import { approvalList, ageorganicCancel } from '../services'

// actions
const GET_DATA = 'auditLoggingList/GET'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

//审批记录列表
export const getAduitLoggingList = () => {
  return dispatch => {
    return approvalList().then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

//审批记录撤回
export const cancelAduitItem = params => {
  return dispatch => {
    return ageorganicCancel(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
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

// Reducer
export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
