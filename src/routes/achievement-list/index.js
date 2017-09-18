import { injectReducer } from '../../store/reducers'
import { achievement } from  '../../routePath'
export default (store) => ({
  path : achievement.list,
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const achievementList = require('./containers/index').default
      const reducer = require('./modules/index').default
      injectReducer(store, { key: 'achievementList', reducer })
      cb(null, achievementList)
    }, 'achievement')
  }
})








