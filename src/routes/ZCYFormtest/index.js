import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'ZCYForm/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const ZCYForm = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'ZCYForm', reducer })
      cb(null, ZCYForm)
    }, 'ZCYForm')
  }
})
