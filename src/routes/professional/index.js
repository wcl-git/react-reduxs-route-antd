import { injectReducer } from '../../store/reducers'
import { professional } from  '../../routePath'

// 专职人员编辑
export default store => ([{
  path: professional.edit,
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const modules = require('./modules')
        const reducer = modules.default
        const { SET_PAGE } = modules
        injectReducer(store, { key: 'professional', reducer })
        store.dispatch({
          type: SET_PAGE,
          payload: {
            formData: {},
            editEnable: true,
            pageType: 'edit'
          }
        })
        callback(null, container)
      },
      'professional'
    )
  }
},{
  path: professional.detail,
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const modules = require('./modules')
        const reducer = modules.default
        const { SET_PAGE } = modules
        injectReducer(store, { key: 'professional', reducer })
        store.dispatch({
          type: SET_PAGE,
          payload: {
            formData: {},
            editEnable: false,
            pageType: 'detail'
          }
        })
        callback(null, container)
      },
      'professional'
    )
  }
},{
  path: professional.audit,
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const modules = require('./modules')
        const reducer = modules.default
        const { SET_PAGE } = modules
        injectReducer(store, { key: 'professional', reducer })
        store.dispatch({
          type: SET_PAGE,
          payload: {
            formData: {},
            editEnable: false,
            auditEnable: true,
            pageType: 'audit'
          }
        })
        callback(null, container)
      },
      'professional'
    )
  }
}])
