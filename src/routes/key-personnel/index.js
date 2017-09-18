import { injectReducer } from '../../store/reducers'
import { keyPersonnel } from '../../routePath'
const INIT_PAGE = 'keyPersonnel/INIT_PAGE'
export default (store) => ({
  path: keyPersonnel.detail,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const keyPersonnel = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'keyPersonnel', reducer })
      store.dispatch({
        type: INIT_PAGE,
        payload: {
          systemData: {},
          legalData: {},
          techniqueData: {},
          financialData: {},
          minorList: [],
          minorTotal: 0,
          isUpdate: false,
          systemEditEnable: false,
          legalEditEnable: false,
          techniqueEditEnable: false,
          financialEditEnable: false,
        }
      })
      cb(null, keyPersonnel)
    }, 'keyPersonnel')
  }
})
