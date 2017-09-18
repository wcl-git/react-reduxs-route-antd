import { injectReducer } from '../../store/reducers'

// 审核说明
export default store => ({
  path: 'auditExplain',
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'auditExplain', reducer })
        callback(null, container)
      },
      'auditExplain'
    )
  }
})
