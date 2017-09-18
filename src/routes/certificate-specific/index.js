import { injectReducer } from '../../store/reducers'
import { certificate } from  '../../routePath'

export default (store) => ([{
  path : certificate.specificDetail,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const containers = require('./containers/index').default;
      const modules = require('./modules/index');
      const reducer = modules.default;
      const { INIT_PAGE } = modules
      injectReducer(store, { key: 'certificateSpecific', reducer });
      store.dispatch({
        type: INIT_PAGE,
        payload: {
          formData:{
            filemanageMaps: {
              value: {}
            },
            code: {
              value: {}
            }
          },
          auditEnable: false,
          editEnable: false,
          pageType: 'detail'
        }
      })
      cb(null, containers)
    }, 'certificate')
  }
}, {
  path : certificate.specificCreate,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const containers = require('./containers/index').default;
      const modules = require('./modules/index');
      const reducer = modules.default;
      const { INIT_PAGE } = modules
      injectReducer(store, { key: 'certificateSpecific', reducer });
      store.dispatch({
        type: INIT_PAGE,
        payload: {
          formData:{
            filemanageMaps: {
              value: {}
            },
            code: {
              value: {}
            }
          },
          auditEnable: false,
          editEnable: true,
          pageType: 'create'
        }
      })
      cb(null, containers)
    }, 'certificate')
  }
}, {
  path : certificate.specificEdit,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const containers = require('./containers/index').default;
      const modules = require('./modules/index');
      const reducer = modules.default;
      const { INIT_PAGE } = modules
      injectReducer(store, { key: 'certificateSpecific', reducer });
      store.dispatch({
        type: INIT_PAGE,
        payload: {
          formData:{
            filemanageMaps: {
              value: {}
            },
            code: {
              value: {}
            }
          },
          auditEnable: false,
          editEnable: true,
          pageType: 'edit'
        }
      })
      cb(null, containers)
    }, 'certificate')
  }
}])
