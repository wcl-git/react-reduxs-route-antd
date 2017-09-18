
import { getFormDataApi, saveFormDataApi, getProUserApi } from '../servers';

const GET_DATA = 'achievement/GET'
const TOGGLE_STATE = 'achievement/TOGGLE'
const SET_PAGE = 'achievement/SET_PAGE'
const INIT_CREATE = 'address/api'
const GET_ID = 'achievement/GET_PRO_USER_ID'
const UPDATE_DATA = 'achievement/UPDATE'

//获取编辑、详情页数据
export const getData = (params) => {
  return (dispatch) => {
    return getFormDataApi(params).then((res) => {
      dispatch({
        type: GET_DATA,
        payload: res
      })
    })
  }
}

//新增页获取proUserId
export const getProUser = () => {
  return () => {
    return getProUserApi()
  }
}

//保存数据
export const saveData = (params) => {
  return () => {
    return saveFormDataApi(params);
  }
}

//切换编辑／展示状态
export const toggleEdit = (flag) => {
  return (dispatch) => {
    return dispatch({
      type: TOGGLE_STATE,
      payload: {
        editEnable: flag
      }
    })
  }
}

//双向绑定
export const updateFormData = (params) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DATA,
      payload: params
    })
  }
}

//判断页面数据是否变化
export const setUpdateFlag = (flag) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_FLAG,
      payload: flag
    })
  }
}

const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    state.formData = action.payload
    return state
  },
  [SET_PAGE]: (state, action) => {
    state = action.payload
    return state
  },
  [INIT_CREATE]: (state, action) => {
    state.address = action.payload
    return state
  },
  [TOGGLE_STATE]: (state, action) => {
    state.editEnable = action.payload.editEnable
    return state
  },
  [GET_ID]: (state, action) => {
    state.proUserId = action.payload.id
    return state
  },
  [UPDATE_DATA]: (state, action) => {
    state.formData = Object.assign({}, state.formData, action.payload)
    return state;
  }
}

const editInitialState = {
  formData: {},
  editEnable: false,
  loading: false,
  options: '',
  address: [],
  page: ''
}

export default function Reducer(state = editInitialState, action) {
  debugger
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
