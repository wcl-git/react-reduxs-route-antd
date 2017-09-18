import { professionalDetail } from '../services'

export const GET_DATA = 'professionalDetail/GET'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
// 数据获取
export const getProfessionalDetailById = params => {
  return dispatch => {
    return professionalDetail(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return {
      ...state,
      professionalDetail: Object.assign({}, state.professionalDetail, action.payload)
    }
  }
}

const initialState = {
  professionalDetail: {},
  editEnable: true
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
