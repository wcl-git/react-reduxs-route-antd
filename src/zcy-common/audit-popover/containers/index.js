import { connect } from 'react-redux'
import dumbComp from '../index'
import { setAgencyAuditInfo } from '../modules'

const mapDispatchToProps = {
  setAgencyAuditInfo: (params) => setAgencyAuditInfo(params)
}

const mapStateToProps = state => {
  let agencyAuditInfo = state.agencyAuditInfo
  
  return {
    agencyAuditInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
