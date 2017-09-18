import { injectReducer } from '../../store/reducers'
import { professional } from  '../../routePath'
import { certificate } from  '../../routePath'
// 专职人员列表
export default store => ({
  path: certificate.creditList,
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'certificateCreditList', reducer })
        callback(null, container)
      },
      'certificate'
    )
  }
})
