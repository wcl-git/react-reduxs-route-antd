import AuditPopover from './Popover'
import agencyAuditInfoReducer, { getAgencyAuditInfo }  from './modules'
AuditPopover.getAgencyAuditInfo = getAgencyAuditInfo
AuditPopover.agencyAuditInfoReducer = agencyAuditInfoReducer

export default AuditPopover
