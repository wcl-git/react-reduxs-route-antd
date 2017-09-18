import { agencyAuditTags, agencyAuditRecord } from '../services'

// actions
const GET_POSTIL = 'auditLogging/POSTIL'
const GET_LOGGING = 'auditLogging/LOGGING'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

//批注信息
export const getAduitPostil = approvalId => {
  return dispatch => {
    return agencyAuditTags(approvalId).then(res => {
      dispatch(ACTION_CREATOR(GET_POSTIL, res))
    })
  }
}

//审批日志列表
export const getAduitLoggingList = approvalId => {
  return dispatch => {
    return agencyAuditRecord(approvalId).then(res => {
      dispatch(ACTION_CREATOR(GET_LOGGING, res))
    })
  }
}

// reducer switch-case handler
const ACTION_HANDLERS = {
  [GET_POSTIL]: (state, action) => {
    return {
      ...state,
      postil: action.payload
    }
  },
  [GET_LOGGING]: (state, action) => {
    return {
      ...state,
      tableList: action.payload
    }
  }
}

const initialState = {
  postil: {},
  tableList: []
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
