import { injectReducer } from '../../store/reducers'
import { professional } from  '../../routePath'
// 专职人员列表
export default store => ({
  path: professional.list,
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'professionalList', reducer })
        callback(null, container)
      },
      'professional'
    )
  }
})
