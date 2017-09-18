export default store => ({
  path: 'writeExplain',
  getComponents(location, callback) {
    require.ensure([], function(require) {
      callback(null, require('./components').default)
    })
  }
})
