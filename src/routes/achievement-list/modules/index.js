import { getFormDataApi, removeFormDataApi, widthdraw } from '../servers';
export const GET_DATA = 'achievementList/Get';
export const REMOVE_DATA = 'achievementList/DEL';
export const SWITCH_TYPE = 'switch_performance_type'

//获取列表
export const getData = (params) => {
  return (dispatch, getState) => {
    return getFormDataApi(params).then((res) => {
      dispatch({
        type: GET_DATA,
        payload: res
      })
    })
  }
}

//删除后获取
export const removeData = (params) => {
  return (dispatch) => (
    removeFormDataApi(params).then((res) => {
      dispatch({
        type: REMOVE_DATA,
        payload: res
      })
    })
  )
}

//切换业绩类型
export const switchPerformanceType = (type) => {
  return (dispatch) => (
    dispatch({
      type: SWITCH_TYPE,
      payload: type
    })
  )
}

//撤销
export const withdraw = () => {
  return () => widthdraw()
}

//switch-case handler
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
  [SWITCH_TYPE]: (state, action) => {
    state.performanceType = action.payload
    return state
  }
}

//组件初始state
const initialState = {
  list: [],
  performanceType: 'perform_system_in',
  total: 0,
}

//纯函数reducer，唯一功能：计算state
export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
