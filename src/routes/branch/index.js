import { injectReducer } from '../../store/reducers'
import { branch } from  '../../routePath'
const SET_PAGE = 'branch/SET_PAGE'

export default (store) => [{
  path: branch.create,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const branch = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'branch', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: true,
          page: 'create',
          formData:{}
        }
      })
      cb(null, branch)
    }, 'branch')
  }
}, {
  path: branch.edit,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const branch = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'branch', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: true,
          page: 'edit',
          formData:{}
        }
      })
      cb(null, branch)
    }, 'branch')
  }
}, {
  path: branch.detail,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const branch = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'branch', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: false,
          page: 'detail',
          formData:{}
        }
      })
      cb(null, branch)
    }, 'branch')
  }
}]






