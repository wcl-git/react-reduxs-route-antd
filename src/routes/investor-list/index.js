import { injectReducer } from '../../store/reducers'

// 出资信息-列表
export default store => ({
  path: 'investor/list',
  getComponent(location, callback) {
    require.ensure(
      [],
      require => {
        const container = require('./containers').default
        const reducer = require('./modules').default
        injectReducer(store, { key: 'investorList', reducer })
        callback(null, container)
      },
      'investorList'
    )
  }
})
