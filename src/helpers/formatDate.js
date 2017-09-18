const moment = require('moment')

module.exports = function(date, format) {
  let mmnt = moment(date)
  return mmnt.format(format)
}
