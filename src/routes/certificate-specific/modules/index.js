
import { 
  getSpecificApi, 
  updateCreditApi, 
  getSpecificTreesApi,
  getDraftDetailApi
} from '../servers'

const nameSpace = 'CERTIFICATE/SPECIFIC';
export const GET_DETAIL = nameSpace+'/GET';
export const TOGGLEFORM = nameSpace+'/TOGGLEFORM';
export const INIT_PAGE = nameSpace + '/INIT_PAGE'
export const UPDATEFORMDATA = nameSpace + '/UPDATEFORMDATA'

export const getSpecific = (params) => {
  return (dispatch) => {
    return getSpecificApi(params).then((res)=>{
      dispatch({
        type: GET_DETAIL,
        payload: res
      })
      return res
    });
  }
}

export const getSpecificTrees = () => {
  return (dispatch) => {
    return getSpecificTreesApi()
  }
}

export const getDraftDetail = (params) => {
  return (dispatch) => {
    return getDraftDetailApi(params)
  }
}

export const updateCredit = (params) => {
  return (dispatch) => {
    return updateCreditApi(params);
  }
}

export const toggleForm = () => {
  return (dispatch) => {
    dispatch({
      type: TOGGLEFORM,
      payload: null
    })
  }
}

export const updateFormData = (params) => {
  return (dispatch) => {
    dispatch({
      type: UPDATEFORMDATA,
      payload: params
    })
  }
}

const ACTION_HANDLERS = {
  [GET_DETAIL]: (state, action) => {
    state.formData = Object.assign({}, state.formData, action.payload)
    return state;
  },
  [TOGGLEFORM]: (state, action) => {
    debugger
    state.editEnable = !state.editEnable
    return state;
  },
  [INIT_PAGE]: (state, action) => {
    state = action.payload
    return state;
  },
  [UPDATEFORMDATA]: (state, action) => {
    state.formData = Object.assign({}, state.formData, action.payload)
    return state;
  }
}
const initialState = {
  formData:{
    filemanageMaps: {
      value: {}
    },
    code: {
      value: {}
    }
  },
  editEnable: false,
  auditEnable: false,
  pageType: ''
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
