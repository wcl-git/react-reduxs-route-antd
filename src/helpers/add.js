const _ = require('lodash')

module.exports = function(a, b) {
  if (_.isNumber(a) && _.isNumber(b)) {
    return _.toNumber(a) + _.toNumber(b)
  }
  if (_.isString(a) && _.isString(b)) {
    return a + b
  }
  return ''
}
