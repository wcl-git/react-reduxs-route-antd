import {getListAPI,delItem} from '../servers'

const TABLE_LIST = 'TABLE_LIST'

export const getList = (id) => {
  return (dispatch) => {
      return getListAPI(id).then(
        (res)=>{
          dispatch({
            type: TABLE_LIST,
            payload: res.data
          })
        }
      )
  }
}

const ACTION_HANDLERS = {
  [TABLE_LIST]: (state, action) => {
    state.list = action.payload;
    return state;
  }
}

const initialState = {
  list: []
};

export default function tableReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
