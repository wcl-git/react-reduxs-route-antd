import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/table',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const table = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'table', reducer })
      cb(null, table)
    }, 'table')
  }
})
