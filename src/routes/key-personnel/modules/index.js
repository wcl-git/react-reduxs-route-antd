
import { getFormDataApi, removeFormDataApi, saveFormDataApi, getMinorFormDataApi } from '../servers';

const GET_DATA = 'keyPersonnel/GET'
const GET_MINOR_DATA = 'keyPersonnel/GET_MINOR'
const REMOVE_MINOR_DATA = 'keyPersonnel/DEL_MINOR'
const TOGGLE_F_STATE = 'keyPersonnel/financil/TOGGLE'
const TOGGLE_L_STATE = 'keyPersonnel/legal/TOGGLE'
const TOGGLE_T_STATE = 'keyPersonnel/technique/TOGGLE'
const TOGGLE_S_STATE = 'keyPersonnel/system/TOGGLE'
const UPDATE_DATA = 'keyPersonnel/UPDATE'
const UPDATE_FLAG = 'keyPersonnel/SET_UPDATE_FLAG'
const INIT_PAGE = 'keyPersonnel/INIT_PAGE'

//获取主要、次要人员列表
export const getFormData = (params) => {
  return (dispatch, getState) => {
    return getFormDataApi(params).then((res) => {
      dispatch({
        type: GET_DATA,
        payload: res
      })
    })
  }
}

//获取次要人员列表
export const getMinorData = (params) => {
  return (dispatch, getState) => {
    return getMinorFormDataApi(params).then((res) => {
      dispatch({
        type: GET_MINOR_DATA,
        payload: res
      })
    })
  }
}

//删除次要人员
export const removeData = (params) => {
  return (dispatch) => (
    removeFormDataApi(params).then((res) => {
      dispatch({
        type: REMOVE_MINOR_DATA,
        payload: res.data
      })
    })
  )
}

//保存数据
export const saveData = (params) => {
  return (dispatch) => {
    return saveFormDataApi(params);
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

//切换四个表格_编辑／展示状态
export const toggleEdit = (type, flag) => {
  return (dispatch) => {
    switch (type) {
      case 'system':
        return dispatch({
          type: TOGGLE_S_STATE,
          payload: {
            systemEditEnable: flag
          }
        })
      case 'legal':
        return dispatch({
          type: TOGGLE_L_STATE,
          payload: {
            legalEditEnable: flag
          }
        })
      case 'financial':
        return dispatch({
          type: TOGGLE_F_STATE,
          payload: {
            financialEditEnable: flag
          }
        })
      case 'technique':
        return dispatch({
          type: TOGGLE_T_STATE,
          payload: {
            techniqueEditEnable: flag
          }
        })
      default:
        break
    }
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

//switch-case handler
const ACTION_HANDLERS = {
  [INIT_PAGE]: (state, action) => {
    state.systemData = action.payload.systemData
    state.legalData = action.payload.legalData
    state.techniqueData = action.payload.techniqueData
    state.financialData = action.payload.financialData
    state.systemEditEnable = action.payload.systemEditEnable
    state.legalEditEnable = action.payload.legalEditEnable
    state.techniqueEditEnable = action.payload.techniqueEditEnable
    state.financialEditEnable = action.payload.financialEditEnable
    return state
  },
  [GET_DATA]: (state, action) => {
    state.systemData = action.payload.systemData
    state.legalData = action.payload.legalData
    state.techniqueData = action.payload.techniqueData
    state.financialData = action.payload.financialData
    state.minorList = action.payload.minor.data
    state.minorTotal = action.payload.minor.total
    return state
  },
  [GET_MINOR_DATA]: (state, action) => {
    state.minorList = action.payload.data
    state.minorTotal = action.payload.total
    return state
  },
  [REMOVE_MINOR_DATA]: (state, action) => {
    state.minorList = action.payload
    return state
  },
  [TOGGLE_T_STATE]: (state, action) => {
    state.techniqueEditEnable = action.payload.techniqueEditEnable
    return state
  },
  [TOGGLE_F_STATE]: (state, action) => {
    state.financialEditEnable = action.payload.financialEditEnable
    return state
  },
  [TOGGLE_L_STATE]: (state, action) => {
    state.legalEditEnable = action.payload.legalEditEnable
    return state
  },
  [TOGGLE_S_STATE]: (state, action) => {
    state.systemEditEnable = action.payload.systemEditEnable
    return state
  },
  [UPDATE_DATA]: (state, action) => {
    let key = ''
    switch (action.payload.key) {
      case '1':
        key = 'legalData'
        break
      case '2':
        key = 'techniqueData'
        break
      case '3':
        key = 'financialData'
        break
      case '6':
        key = 'systemData'
        break
      default:
        break
    }
    state[key] = Object.assign({}, state[key], action.payload.value)
    return state;
  },
  [UPDATE_FLAG]: (state, action) => {
    state.isUpdate = action.payload
    return state;
  }
}

//组件初始state
const initialState = {
  systemData: {},
  legalData: {},
  techniqueData: {},
  financialData: {},
  minorList: [],
  minorTotal: 0,
  isUpdate: false,
  systemEditEnable: false,
  legalEditEnable: false,
  techniqueEditEnable: false,
  financialEditEnable: false,
}

//纯函数reducer，唯一功能：计算state
export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
