import { metaCurrency, investorDetail, investorSave } from '../services'

export const GET_DATA = 'investor/GET'
export const PAGE_STATE = 'investor/PAGE_STATE'
export const INIT_CONF = 'investor/CONF'
export const DUPLEX_DATA = 'investor/DUPLEX_DATA'

// action creators
const ACTION_CREATOR = (type, response) => ({
  type,
  payload: response
})

export const getInitConf = id => {
  return dispatch => {
    return metaCurrency().then(res => {
      dispatch(ACTION_CREATOR(INIT_CONF, res))
    })
  }
}

export const getAgeinvestordData = params => {
  return dispatch => {
    return investorDetail(params).then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

export const setAgeinvestordData = data => {
  return dispatch => {
    dispatch(
      ACTION_CREATOR(PAGE_STATE, {
        editEnable: true
      })
    )
    return investorSave(data).then(res => {
      dispatch(
        ACTION_CREATOR(PAGE_STATE, {
          editEnable: false
        })
      )
    })
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

// reducer switch-case
const ACTION_HANDLERS = {
  [INIT_CONF]: (state, action) => {
    state.currencyConf = action.payload
    return state
  },
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
  currencyConf: [],
  formData: {},
  page: '',
  editEnable: false,
  auditEnable: false
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
