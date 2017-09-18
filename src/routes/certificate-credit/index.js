import { injectReducer } from '../../store/reducers'
import { certificate } from  '../../routePath'

export default (store) => ([{
  path : certificate.creditDetail,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const containers = require('./containers/index').default;
      const modules = require('./modules/index');
      const reducer = modules.default;
      const { INIT_PAGE } = modules
      injectReducer(store, { key: 'certificateCredit', reducer });
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
          editEnable: false,
          auditEnable: false
        }
      })
      cb(null, containers)
    }, 'certificate')
  }
}, {
  path : certificate.creditCreate,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const containers = require('./containers/index').default;
      const modules = require('./modules/index');
      const reducer = modules.default;
      const { INIT_PAGE } = modules
      injectReducer(store, { key: 'certificateCredit', reducer });
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
          editEnable: true,
          auditEnable: false
        }
      })
      cb(null, containers)
    }, 'certificate')
  }
}, {
  path : certificate.creditEdit,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const containers = require('./containers/index').default;
      const modules = require('./modules/index');
      const reducer = modules.default;
      const { INIT_PAGE } = modules
      injectReducer(store, { key: 'certificateCredit', reducer });
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
          editEnable: true,
          auditEnable: false
        }
      })
      cb(null, containers)
    }, 'certificate')
  }
}])
