import {
  investorAttachments,
  attachmentUpload,
  investorList,
  investorDelete
} from '../services'

export const GET_FILE = 'investorList/GET_FILE'
export const GET_LIST = 'investorList/GET'
export const SET_EDIT = 'investorList/SET_EDIT'

// action creators
const ACTION_CREATOR = (type, response) => ({
  type,
  payload: response
})

//附件-公司章程
export const loadAccessory = params => {
  return (dispatch, getState) => {
    return investorAttachments(params).then(res => {
      dispatch(ACTION_CREATOR(GET_FILE, res))
    })
  }
}

// 上传附件
export const uploadAccessory = attachmentMaps => {
  return dispatch => {
    return attachmentUpload(attachmentMaps)
  }
}

//表单状态切换
export const toggleFormState = flag => {
  return dispatch => {
    dispatch(
      ACTION_CREATOR(SET_EDIT, {
        editEnable: flag
      })
    )
  }
}

// 出资人列表
export const loadInvestorList = params => {
  return (dispatch, getState) => {
    return investorList(params).then(res => {
      dispatch(ACTION_CREATOR(GET_LIST, res))
    })
  }
}

// 删除出资人
export const removeInvestorItem = params => {
  return dispatch => {
    return investorDelete(params).then(res => {
      dispatch(ACTION_CREATOR(GET_LIST, res))
    })
  }
}

const ACTION_HANDLERS = {
  [GET_FILE]: (state, action) => {
    state.formData.fileList = action.payload
    return state
  },
  [SET_EDIT]: (state, action) => {
    return {
      ...state,
      ...action.payload
    }
  },
  [GET_LIST]: (state, action) => {
    return {
      ...state,
      tableList: action.payload.data,
      total: action.payload.total
    }
  }
}

const initialState = {
  formData: {},
  editEnable: false,
  tableList: [],
  total: 0
}

export default function Reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
