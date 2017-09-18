
import { getFormDataApi, removeFormDataApi } from '../servers';
export const GET_DATA = 'agefinance/GET';
export const REMOVE_DATA = 'agefinance/DELETE';

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
    });
  }
}

//reducer-switch,纯函数
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    state.list = action.payload.data
    return state
  },
  [REMOVE_DATA]: (state, action) => {
    state.list = action.payload.data
    return state
  }
}

//初始状态库
const initialState = {
  list: []
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
