import { injectReducer } from '../../store/reducers'

// 基本信息-审核记录
export default store => ({
  path: 'auditLogging/detail/:id',
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'auditLogging', reducer })
        callback(null, container)
      },
      'auditLogging'
    )
  }
})
