export const AGENCYAUDITBASEINFO = 'AGENCYAUDITBASEINFO/SET'

export function agencyAuditBaseInfoAction(res) {
  return {
    type: AGENCYAUDITBASEINFO,
    payload: res
  };
}

export const setAgencyAuditBaseInfo = (params) => {
  return dispatch => {
    dispatch(agencyAuditBaseInfoAction(params))
  }
};

const initialState = {};
export default function agencyAuditBaseInfoReducer(state = initialState, action) {
  return action.type === AGENCYAUDITBASEINFO
    ? Object.assign({}, state, action.payload)
    : state;
}