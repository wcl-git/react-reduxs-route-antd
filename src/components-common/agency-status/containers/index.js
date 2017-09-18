import { connect } from 'react-redux'
import dumbComp from '../components'
import { getAgencyAuditStatus } from '../modules'
import { getAgencyCirculationLog } from 'components-common/circulation-log/modules'

const mapDispatchToProps = {
  getAgencyCirculationLog: () => getAgencyCirculationLog(),
  getAgencyAuditStatus: () => getAgencyAuditStatus()
}

const mapStateToProps = state => {
  let agencyAuditStatus = state.agencyAuditStatus
  let USER = state.layout.USER
  let agencyAuditBaseInfo = state.agencyAuditBaseInfo
  return {
    agencyAuditStatus,
    USER,
    agencyAuditBaseInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
