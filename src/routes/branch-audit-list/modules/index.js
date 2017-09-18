
import { getFormDataApi, removeFormDataApi, auditApi } from '../servers';
export const GET_DATA = 'branchAuditList/GET'
export const REMOVE_DATA = 'branchAuditList/DELETE'
export const REJECT = 'branchAuditList/REJECT'
export const AUDIT = 'branchAuditList/AUDIT'
export const INIT = 'branchAuditList/INIT_FORM'

//获取列表
export const getData = (params) => {
  return (dispatch, getState) => {
    return getFormDataApi(params).then((res) => {
      dispatch({
        type: GET_DATA,
        payload: res
      })
    });
  }
}

//删除
export const removeData = (params) => {
  return (dispatch) => {
    return removeFormDataApi(params).then(() => {
      dispatch({
        type: REMOVE_DATA
      })
    });
  }
}

//审批
export const audit = (params) => {
  return (dispatch) => {
    return auditApi(params).then((res) => {
      dispatch({
        type: AUDIT,
        payload: res
      })
    });
  }
}

//初始化审核表单
export const initForm = () => {
  return (dispatch) => {
    dispatch({
      type: INIT,
      payload: {}
    })
  }
}

//reducer-switch,纯函数
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    state.list = action.payload.data
    state.total = action.payload.total
    return state
  },
  [REMOVE_DATA]: (state, action) => {
    return state
  },
  [AUDIT]: (state, action) => {
    state.list = action.payload.data
    state.total = action.payload.total
    return state
  },
  [REJECT]: (state, action) => {
    state.list = action.payload.data
    return state
  },
  [INIT]: (state, action) => {
    state.data = action.payload
    return state
  }
}

//初始状态库
const initialState = {
  list: [],
  total: 0,
  data: {}
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
