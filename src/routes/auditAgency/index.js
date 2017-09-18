import { injectReducer } from '../../store/reducers'

// 审核机构
export default store => ({
  path: 'auditAgency',
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'auditAgency', reducer })
        callback(null, container)
      },
      'auditAgency'
    )
  }
})
