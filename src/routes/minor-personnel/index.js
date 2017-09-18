import { injectReducer } from '../../store/reducers'
import { minorPersonnel } from '../../routePath'
const SET_PAGE = 'minorPersonnel/SET_PAGE'

export default (store) => [{
  path: minorPersonnel.create,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const minorPersonnel = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'minorPersonnel', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          page: 'create',
          editEnable: true,
          formData: {}
        }
      })
      cb(null, minorPersonnel)
    }, 'minorPersonnel')
  }
}, {
  path: minorPersonnel.edit,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const minorPersonnel = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'minorPersonnel', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          page: 'edit',
          editEnable: true,
          formData: {}
        }
      })
      cb(null, minorPersonnel)
    }, 'minorPersonnel')
  }
}, {
  path: minorPersonnel.detail,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const minorPersonnel = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'minorPersonnel', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          page: 'detail',
          editEnable: false,
          formData: {}
        }
      })
      cb(null, minorPersonnel)
    }, 'minorPersonnel')
  }
}]






