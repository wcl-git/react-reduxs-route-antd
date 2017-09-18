import { injectReducer } from '../../store/reducers'
import { branch } from '../../routePath'

export default (store) => ({
  path: branch.list,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const branchList = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'branchList', reducer })
      cb(null, branchList)
    }, 'branch')
  }
})
