import { injectReducer } from '../../store/reducers'
import { professional } from  '../../routePath'

// 新增专职人员
export default store => ({
  path: professional.create,
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'professionalCreate', reducer })
        callback(null, container)
      },
      'professional'
    )
  }
})