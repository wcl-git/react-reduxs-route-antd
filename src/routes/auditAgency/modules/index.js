import { organicAuditOrganic, organicAuditOrganicList } from '../services'

const GET_DATA = 'auditAgency/GET'
const AGENCY_LIST = 'auditAgency/GET_LIST'

// action creators
const ACTION_CREATOR = (type, data) => ({
  type,
  payload: data
})

//审批机构信息
export const getData = () => {
  return dispatch => {
    return organicAuditOrganic().then(res => {
      dispatch(ACTION_CREATOR(GET_DATA, res))
    })
  }
}

//审批机构列表
export const getAuditAgencyList = distId => {
  return dispatch => {
    return organicAuditOrganicList(distId).then(res => {
      dispatch(ACTION_CREATOR(AGENCY_LIST, res))
    })
  }
}

const ACTION_HANDLERS = {
  [GET_DATA]: (state, action) => {
    return { ...state, agencyData: action.payload }
  },
  [AGENCY_LIST]: (state, action) => {
    return { ...state, auditAgencyList: action.payload }
  }
}

const initialState = {
  agencyData: {},
  auditAgencyList: []
}

export default function achievementDetailReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state)
  return handler ? handler(nextState, action) : nextState
}
