import { ZCYUtils } from 'zcy-common'

export default {
  isAudit() {
    return ZCYUtils.getCookie('isAudit') === 'true'
  },
  orgId() {
    return ZCYUtils.getCookie('orgId')
  },
  auditId() {
    return ZCYUtils.getCookie('auditId')
  },
  state() {
    return ZCYUtils.getCookie('state')
  }
}