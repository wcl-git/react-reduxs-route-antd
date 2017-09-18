import { injectReducer } from '../../store/reducers'
import { certificate } from  '../../routePath'

export default (store) => ({
  path : certificate.base,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const containers= require('./containers/index').default;
      const  modules = require('./modules/index');
      const  reducer = modules.default;
      injectReducer(store, { key: 'certificateBase', reducer });
      cb(null, containers)
    }, 'certificateBase')
  }
})
