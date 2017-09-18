import { injectReducer } from '../../store/reducers'
import { PAGE_STATE } from './modules'
import { organic } from  '../../routePath'
import { ZCYUtils } from 'zcy-common'
// 基本信息
export default store => [
  {
    path: organic.detail,
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'organic', reducer })
          ZCYUtils.setCookie('isAudit', false)
          store.dispatch({
            type: 'AGENCYAUDITBASEINFO/SET',
            payload: {
              isAudit: false
            }
          })
          store.dispatch({
            type: PAGE_STATE,
            payload: {
              editEnable: false
            }
          })
          callback(null, container)
        },
        'organic'
      )
    }
  },
  {
    path: organic.edit,
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'organic', reducer })
          store.dispatch({
            type: PAGE_STATE,
            payload: {
              editEnable: true
            }
          })
          callback(null, container)
        },
        'organic'
      )
    }
  },
  {
    path: organic.audit,
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'organic', reducer })
          ZCYUtils.setCookie('isAudit', true)
          store.dispatch({
            type: 'AGENCYAUDITBASEINFO/SET',
            payload: {
              isAudit: true
            }
          })
          store.dispatch({
            type: PAGE_STATE,
            payload: {
              editEnable: false,
              auditEnable: true,
            }
          })
          callback(null, container)
        },
        'organic'
      )
    }
  }
]
