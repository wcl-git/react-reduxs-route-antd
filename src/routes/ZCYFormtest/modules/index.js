
import {getFormDataApi,setDataApi} from '../servers'
export const GET_DATA = 'GET_DATA';
export const SET_DATA = 'SET_DATA';
export const SET_EDIT = 'SET_EDIT';

export const getData = (params) => {
  return (dispatch) => {
    return getFormDataApi(params).then((res)=>{
      dispatch({
        type: GET_DATA,
        payload: res
      })
    });
  }
}
export const setData =  (params) => {
  return (dispatch) => {
    dispatch({
      type:SET_DATA,
      payload:{
        loading:true,
        editEnable:true,
        formData:params
      }
    })
    return setDataApi(params).then(()=>{
      dispatch({
        type: SET_DATA,
        payload: {
          loading:false,
          editEnable:false,
          formData:params
        }
      })
    });
  }
}

export const setEdit =  () => {
  return (dispatch) => {
    dispatch({
      type:SET_EDIT,
      payload:{
        editEnable:true
      }
    })
  }
}

const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    let {options,...formData} = action.payload
    state.formData = formData;
    state.options = options;
    return state
  },
  [SET_DATA]: (state, action) => {
    state.loading = action.payload.loading;
    state.editEnable = action.payload.editEnable;
    state.formData = action.payload.formData;
    return state
  },
  [SET_EDIT]: (state) => {
    state.editEnable = true
    return state
  }
}
const initialState = {
  formData:{
    email:""
  },
  loading:false,
  editEnable:true
}

export default function ZCYFormReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
