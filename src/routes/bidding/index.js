import { injectReducer } from '../../store/reducers'
import { PAGE_STATE } from './modules'

// 开评标场地信息-新增、详情、编辑
export default store => [
  {
    path: 'bidding/create',
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'bidding', reducer })
          store.dispatch({
            type: PAGE_STATE,
            payload: {
              page: 'create',
              editEnable: true,
              formData: {}
            }
          })
          callback(null, container)
        },
        'bidding'
      )
    }
  },
  {
    path: 'bidding/detail/:id', //开评标场地Id
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'bidding', reducer })
          store.dispatch({
            type: PAGE_STATE,
            payload: {
              page: 'detail',
              editEnable: false
            }
          })
          callback(null, container)
        },
        'bidding'
      )
    }
  },
  {
    path: 'bidding/edit/:id', //开评标场地Id
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'bidding', reducer })
          store.dispatch({
            type: PAGE_STATE,
            payload: {
              page: 'edit',
              editEnable: true
            }
          })
          callback(null, container)
        },
        'bidding'
      )
    }
  }
]
