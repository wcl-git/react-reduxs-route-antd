import { injectReducer } from '../../store/reducers'
import { PAGE_STATE } from './modules'

// 出资信息
export default store => [
  {
    path: 'investor/create',
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'investor', reducer })
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
        'investor'
      )
    }
  },
  {
    path: 'investor/detail/:id',
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'investor', reducer })
          store.dispatch({
            type: PAGE_STATE,
            payload: {
              page: 'detail',
              editEnable: false
            }
          })
          callback(null, container)
        },
        'investor'
      )
    }
  },
  {
    path: 'investor/edit/:id',
    getComponent(location, callback) {
      require.ensure(
        [],
        require => {
          const container = require('./containers').default
          const reducer = require('./modules').default
          injectReducer(store, { key: 'investor', reducer })
          store.dispatch({
            type: PAGE_STATE,
            payload: {
              page: 'edit',
              editEnable: true
            }
          })
          callback(null, container)
        },
        'investor'
      )
    }
  }
]
