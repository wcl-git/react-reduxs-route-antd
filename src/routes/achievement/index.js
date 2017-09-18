import { injectReducer } from '../../store/reducers'
import { achievement } from '../../routePath'
const SET_PAGE = 'achievement/SET_PAGE'

export default (store) => [{
  path: achievement.create,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const achievement = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'achievement', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: true,
          page: 'create',
          formData: {}
        }
      })
      cb(null, achievement)
    }, 'achievement')
  }
}, {
  path: achievement.edit,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const achievement = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'achievement', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: true,
          page: 'edit',
          formData: {}
        }
      })
      cb(null, achievement)
    }, 'achievement')
  }
}, {
  path: achievement.detail,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const achievement = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'achievement', reducer })
      store.dispatch({
        type: SET_PAGE,
        payload: {
          editEnable: false,
          page: 'detail',
          formData: {}
        }
      })
      cb(null, achievement)
    }, 'achievement')
  }
}]






