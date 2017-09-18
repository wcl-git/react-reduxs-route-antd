import { getAgencyAuditInfoApi } from '../services';

export const SET_AUDITINFO = 'AUDITINFO/SET'
export const GET_AUDITINFO = 'AUDITINFO/GET'

export function agencyAuditInfoAction(type, data) {
  return {
    type,
    payload: data
  };
}

export const setAgencyAuditInfo = (params) => {
  return dispatch => {
    dispatch(agencyAuditInfoAction(SET_AUDITINFO, params))
  }
};

export const getAgencyAuditInfo = (params) => {
  return dispatch => {
    return getAgencyAuditInfoApi(params).then((res) => {
      let data = {};
      data[params.key] = res;
      dispatch(agencyAuditInfoAction(GET_AUDITINFO, data))
    })
  }
};

const ACTION_HANDLERS = {
  [SET_AUDITINFO]: (state, action) => {
    let { key, ...rest } = action.payload;
    let keys = key.split('.');
    let tmp = {};
    for (let i = 0, len = keys.length; i <= len; i++) {
      if (i === 0) {
        if (!state[keys[i]]) {
          state[keys[i]] = {}
          tmp = state[keys[i]]
        } else {
          tmp = state[keys[i]]
        }
      } else if (i !== len) {
        if (!tmp[keys[i]]) {
          tmp[keys[i]] = {}
          tmp = tmp[keys[i]]
        } else {
          tmp = tmp[keys[i]]
        }
      } else {
        Object.assign(tmp, rest)
      }
    }
    return state;
  },
  [GET_AUDITINFO]: (state, action) => {
    Object.assign(state, action.payload)
    return state
  }
}

const initialState = {};
export default function agencyAuditInfoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}