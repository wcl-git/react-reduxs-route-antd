import { biddingDetail, biddingSave, biddingDelete } from '../services'

export const GET_DATA = 'bidding/GET'
export const PAGE_STATE = 'bidding/PAGE_STATE'
export const DUPLEX_DATA = 'bidding/DUPLEX_DATA'

// action creators
const ACTION_CREATOR = (type, response) => ({
  type,
  payload: response
})

// dispatch 异步 action
// 数据获取
export const getPlaceInfoById = params => {
  return dispatch => {
    return biddingDetail(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

// 保存
export const postPlaceInfo = data => {
  return dispatch => {
    dispatch(
      ACTION_CREATOR(PAGE_STATE, {
        editEnable: true
      })
    )
    return biddingSave(data).then(res => {
      dispatch(
        ACTION_CREATOR(PAGE_STATE, {
          editEnable: false
        })
      )
    })
  }
}

// 切换编辑查看状态
export const toggleFormState = flag => {
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

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return {
      ...state,
      formData: action.payload
    }
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
  page: '',
  editEnable: true, // 默认 编辑状态
  auditEnable: false
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
