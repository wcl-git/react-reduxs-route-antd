import { professionalList } from '../services'

export const GET_DATA = 'professionalList/GET'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
// 数据获取
export const getProfessionalById = params => {
  return dispatch => {
    return professionalList(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return {
      ...state,
      professionalList: action.payload
    }
  }
}

const initialState = {
  professionalList: []
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
