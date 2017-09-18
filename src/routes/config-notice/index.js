import { injectReducer } from '../../store/reducers'

// 公示管理配置
export default store => ({
  path: 'manageConfig/notice',
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'configNotice', reducer })
        callback(null, container)
      },
      'configNotice'
    )
  }
})
