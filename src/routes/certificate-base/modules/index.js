
import { getCertificateApi, updateCertificateApi } from '../servers'

const nameSpace = 'CERTIFICATE/';
export const GET_DETAIL = nameSpace + 'GET_DETAIL';
export const UPDATE = nameSpace + 'UPDATE';
export const TOGGLEFORM = nameSpace + 'TOGGLEFORM';
export const CHANGERADIO = nameSpace + 'CHANGERADIO';
export const UPDATEFORMDATA = nameSpace + 'UPDATEFORMDATA';

export const getCertificate = (params) => {
  return (dispatch) => {
    return getCertificateApi(params).then((res)=>{
      dispatch({
        type: GET_DETAIL,
        payload: res
      })
    });
  }
}

export const updateCertificate = (params) => {
  return (dispatch) => {
    return updateCertificateApi(params).then((res)=>{
      dispatch({
        type: UPDATE,
        payload: res
      })
    });
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

export const changeRadio = (type) => {
  return (dispatch) => {
      dispatch({
        type: CHANGERADIO,
        payload: type
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
    return {
      ...state,
      ...action.payload,
      type: action.payload.type ? action.payload.type : 'oneToOne'
    };
  },
  [TOGGLEFORM]: (state, action) => {
    state.editEnable = !state.editEnable
    return state;
  },
  [CHANGERADIO]: (state, action) => {
    state.type = action.payload
    return state;
  },
  [UPDATEFORMDATA]: (state,action) => {
    let data = action.payload
    state[data.key] = Object.assign({}, state[data.key], data.value)
    return state;
  }
}
const initialState = {
  editEnable: false,
  auditEnable: false,
  type:'oneToOne',
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
