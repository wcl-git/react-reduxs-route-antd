
import { getFormDataApi, removeFormDataApi, submitApi } from '../servers'
export const GET_DATA = 'branchList/GET'
export const REMOVE_DATA = 'branchList/DELETE'
export const INIT = 'branchList/INIT_FORM'
export const SUBMIT_DATA = 'branchList/SUBMIT'
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
    return removeFormDataApi(params).then((res) => {
      dispatch({
        type: REMOVE_DATA,
        payload: res
      })
    })
  }
}

//提交
export const submit = (data) => {
  return (dispatch) => {
    return submitApi(data).then((res) => {
      dispatch({
        type: SUBMIT_DATA,
        payload: res
      })
    })
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
    state.list = action.payload.data
    state.total = action.payload.total
    return state
  },
  [INIT]: (state, action) => {
    state.data = action.payload
    return state
  },
  [SUBMIT_DATA]: (state, action) => {
    state.list = action.payload.data
    state.total = action.payload.total
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
