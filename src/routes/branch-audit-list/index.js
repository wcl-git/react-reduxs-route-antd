import { injectReducer } from '../../store/reducers'
import { branchAudit } from  '../../routePath'
export default (store) => ({
  path : branchAudit.list,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const branchAuditList = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'branchAuditList', reducer })
      cb(null, branchAuditList)
    }, 'branch')
  }
})
