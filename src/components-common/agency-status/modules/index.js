import { agencyAuditStatus } from '../services';

export const AUDITSTATUS = 'AUDITSTATUS/GET'

export function agencyAuditStatusAction(res) {
  return {
    type: AUDITSTATUS,
    payload: res
  };
}

export const getAgencyAuditStatus = () => {
  return dispatch => {
    agencyAuditStatus().then((res) => {
      dispatch(agencyAuditStatusAction(res))
    })
  }
};

const initialState = {};
export default function agencyAuditStatusReducer(state = initialState, action) {
  return action.type === AUDITSTATUS
    ? action.payload
    : state;
}