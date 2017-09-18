
import { getFormDataApi, saveFormDataApi, getAddressApi } from '../servers';

const GET_DATA = 'financial/GET'
const SAVE_DATA = 'financial/SAVE'
const UPDATE_DATA = 'financial/UPDATE'
const TOGGLE_STATE = 'financial/TOGGLE'
const SET_PAGE = 'financial/SET_PAGE'
const UPDATE_FLAG = 'financial/SET_UPDATE_FLAG'

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

//保存数据
export const saveData = (params) => {
  return (dispatch) => {
    return saveFormDataApi(params)
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
  [TOGGLE_STATE]: (state, action) => {
    state.editEnable = action.payload.editEnable
    return state
  },
  [UPDATE_DATA]: (state, action) => {
    state.formData = Object.assign({}, state.formData, action.payload)
    return state;
  },
  [UPDATE_FLAG]: (state, action) => {
    state.isUpdate = action.payload
    return state;
  }
}

const editInitialState = {
  formData: {},
  editEnable: false,
  loading: false,
  modalConfig: {
    props: {},
    content: ''
  },
  page: '',
  isUpdate: false,
}

export default function Reducer(state = editInitialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
