import { organicDetail, organicUpdate } from '../services'

export const GET_DATA = 'organic/GET'
export const PAGE_STATE = 'organic/PAGE_STATE'
export const DUPLEX_DATA = 'organic/DUPLEX_DATA'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
export const loadAgencyDetail = (params) => {
  return (dispatch, getState) => {
    return organicDetail(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

export const saveAgencyOrganic = data => {
  return (dispatch, getState) => {
    return organicUpdate(data)
  }
}

// 切换编辑查看状态
export const setEdit = flag => {
  return dispatch => {
    dispatch(
      ACTION_CREATOR(PAGE_STATE, {
        editEnable: flag
      })
    )
  }
}

//双向绑定
export const duplexFormData = params => {
  return dispatch => {
    dispatch({
      type: DUPLEX_DATA,
      payload: params
    })
  }
}

const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    state.formData = action.payload
    return state
  },
  [PAGE_STATE]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [DUPLEX_DATA]: (state, action) => {
    state.formData = Object.assign({}, state.formData, action.payload)
    return state
  }
}
const initialState = {
  formData: {},
  editEnable: false,
  auditEnable: false
}

export default (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type]
  const nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
