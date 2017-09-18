import { injectReducer } from '../../store/reducers'
import { agencyQuery } from  '../../routePath'

export default (store) => ({
  path : agencyQuery.list,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const agencyQuery = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'agencyQuery', reducer })
      cb(null, agencyQuery)
    }, 'agencyQuery')
  }
})
