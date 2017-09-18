import { injectReducer } from '../../store/reducers'
import { financial } from '../../routePath'
const SET_PAGE = 'financial/SET_PAGE'

export default (store) => [{
  path: financial.create,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const financial = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'financial', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: true,
          page: 'create',
          formData: {
            salesProfitMargin: {},
            assetLiabilityRatio: {}
          }
        }
      })
      cb(null, financial)
    }, 'financial')
  }
}, {
  path: financial.edit,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const financial = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'financial', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: true,
          page: 'edit',
          formData: {}
        }
      })
      cb(null, financial)
    }, 'financial')
  }
}, {
  path: financial.detail,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const financial = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'financial', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: false,
          page: 'detail',
          formData: {}
        }
      })
      cb(null, financial)
    }, 'financial')
  }
}]






