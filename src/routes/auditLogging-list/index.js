import { injectReducer } from '../../store/reducers'

// 开评标场地列表
export default store => ({
  path: 'auditLogging/list',
  getComponent(nextState, cb) {
    require.ensure(
      [],
      require => {
        const smartComp = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'auditLoggingList', reducer })
        cb(null, smartComp)
      },
      'auditLoggingList'
    )
  }
})
