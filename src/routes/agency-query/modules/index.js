
import { getFormDataApi, removeFormDataApi } from '../servers';
export const GET_DATA = 'agencyQuery/GET';
export const REMOVE_DATA = 'agencyQuery/DEL';

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

//reducer-switch,纯函数
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    state.list = action.payload.data,
    state.total = action.payload.total
    return state
  },
  [REMOVE_DATA]: (state, action) => {
    return state
  }
}

//初始状态库
const initialState = {
  list: [],
  total: 0
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
