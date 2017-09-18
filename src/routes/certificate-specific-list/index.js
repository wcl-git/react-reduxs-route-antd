import { injectReducer } from '../../store/reducers'
import { certificate } from  '../../routePath'
// 专职人员列表
export default store => ({
  path: certificate.specificList,
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'certificateSpecificList', reducer })
        callback(null, container)
      },
      'certificate'
    )
  }
})
