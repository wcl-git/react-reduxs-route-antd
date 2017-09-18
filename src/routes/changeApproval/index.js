import { injectReducer } from '../../store/reducers'

// 专职人员列表
export default store => ({
  path: 'approval/change/detail',
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'changeApprovalDetail', reducer })
        callback(null, container)
      },
      'changeApprovalDetail'
    )
  }
})
