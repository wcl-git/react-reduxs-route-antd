import { injectReducer } from '../../store/reducers'
import { approval } from  '../../routePath'

// 专职人员列表
export default store => ({
  path: approval.publicList,
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'approvalPublicList', reducer })
        callback(null, container)
      },
      'approvalPublicList'
    )
  }
})
