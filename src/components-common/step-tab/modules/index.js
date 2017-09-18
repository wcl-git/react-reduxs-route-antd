import { initializeProgress } from '../services';

export const INIT_TAB_PROGRESS = 'INIT_TAB_PROGRESS'

export function initTabProgress(res) {
  return {
    type: INIT_TAB_PROGRESS,
    payload: res
  };
}

export const getInitTabProgress = () => {
  return dispatch => {
    initializeProgress().then((res) => {
      dispatch(initTabProgress(res))
    })
  }
};

const initialState = {};
export default function initTabProgressReducer(state = initialState, action) {
  return action.type === INIT_TAB_PROGRESS
    ? action.payload
    : state;
}