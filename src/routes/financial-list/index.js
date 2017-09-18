import { injectReducer } from '../../store/reducers'
import { financial } from  '../../routePath'

export default (store) => ({
  path : financial.list,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const financialList = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'financialList', reducer })
      cb(null, financialList)
    }, 'financial')
  }
})
