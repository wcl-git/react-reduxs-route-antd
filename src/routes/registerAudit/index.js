import { injectReducer } from '../../store/reducers'

// 注册审核
export default store => ({
  path: 'register-audit',
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'registerAudit', reducer })
        callback(null, container)
      },
      'registerAudit'
    )
  }
})
