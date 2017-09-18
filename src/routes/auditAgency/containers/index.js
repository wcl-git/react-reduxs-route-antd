import { connect } from 'react-redux'
import { getData, getAuditAgencyList } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  init: () => getData({}),
  getAuditAgencyList: distId => getAuditAgencyList(distId),
}

const mapStateToProps = state => {
  const { auditAgency, layout } = state
  const USER = layout.USER
  const District = layout.appsBasicInfo.getMyDistrict

  return {
    auditAgency,
    USER,
    District
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
