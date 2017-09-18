import { agencyCirculationLog } from '../services';

export const AGENCYCIRCULATIONLOG = 'AGENCYCIRCULATIONLOG/GET'

export function agencyCirculationLogAction(res) {
  return {
    type: AGENCYCIRCULATIONLOG,
    payload: res
  };
}

export const getAgencyCirculationLog = () => {
  return dispatch => {
    return agencyCirculationLog().then((res) => {
      dispatch(agencyCirculationLogAction(res))
    })
  }
};

const initialState = [];
export default function agencyCirculationLogReducer(state = initialState, action) {
  return action.type === AGENCYCIRCULATIONLOG
    ? action.payload
    : state;
}