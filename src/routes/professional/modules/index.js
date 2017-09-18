import { 
  getProfessionalApi, 
  updateProfessional 
} from '../services'

const nameSpace = 'PROFESSIONAL/'
export const GET_DATA = nameSpace + 'GET'
export const TOGGLEFORM = nameSpace + 'TOGGLEFORM'
export const SET_PAGE = nameSpace + 'SET_PAGE'
export const UPDATEFORMDATA = nameSpace + 'UPDATEFORMDATA'


// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

// dispatch 异步 action
// 数据获取
export const getProfessional = params => {
  return dispatch => {
    return getProfessionalApi(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

export const toggleForm = () => {
  return dispatch => {
    dispatch(ACTION_CREATOR(TOGGLEFORM))
  }
}

export const saveFormData = params => {
  return dispatch => {
    return updateProfessional(params).then(res => {
      //dispatch(ACTION_CREATOR(GET_DATA, params))
    })
  }
}

export const updateFormData = params => {
  return dispatch => {
    dispatch(ACTION_CREATOR(UPDATEFORMDATA, params))
  }
}

// reducer switch-case
const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    state.formData = Object.assign({}, state.formData, action.payload)
    return state;
  },
  [TOGGLEFORM]: (state, action) => {
    return {
      ...state,
      editEnable: !state.editEnable
    }
  },
  [SET_PAGE]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [UPDATEFORMDATA]: (state, action) => {
    state.formData = Object.assign({}, state.formData, action.payload)
    return state;
  }
}

const initialState = {
  formData: {},
  editEnable: false,
  auditEnable: false,
  pageType: ''
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
