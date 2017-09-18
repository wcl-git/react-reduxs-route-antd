import { biddingList, biddingDelete } from '../services'

// actions
const GET_DATA = 'biddingList/GET'
const SWITCH_TYPE = 'biddingList/TYPE'

// action creators
const ACTION_CREATOR = (type, response) => ({
  type,
  payload: response
})

// dispatch 异步 action
export const getPlaceInfo = params => {
  return dispatch => {
    return biddingList(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

// 删除
export const delPlaceInfoById = params => {
  return dispatch => {
    return biddingDelete(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

//切换业绩类型
export const switchPlaceType = type => {
  return dispatch =>
    dispatch({
      type: SWITCH_TYPE,
      payload: type
    })
}

// reducer switch-case handler
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return {
      ...state,
      tableList: action.payload.data,
      total: action.payload.total
    }
  },
  [SWITCH_TYPE]: (state, action) => {
    state.placeType = action.payload
    return {
      placeType: action.payload
    }
  }
}

const initialState = {
  placeType: 'all',
  tableList: [],
  total: null
}

// Reducer
export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
