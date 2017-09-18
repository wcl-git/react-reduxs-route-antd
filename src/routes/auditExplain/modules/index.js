import { auditOrganic } from '../services'

const GET_DATA = 'auditExplain/GET'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

//审核说明
export const getData = () => {
  return dispatch => {
    return auditOrganic().then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return { ...state, agencyInfo: action.payload }
  }
}

const initialState = {
  agencyInfo: {}
}

export default function achievementDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
