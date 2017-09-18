import { connect } from 'react-redux'
import dumbComp from '../components'
import { agencySubmit, approvalSubmit } from '../modules'

const mapDispatchToProps = {
  agencySubmit: () => agencySubmit(),
  approvalSubmit: (params) => approvalSubmit(params)
}

const mapStateToProps = state => {
  let agencyAuditInfo = state.agencyAuditInfo
  return {
    agencyAuditInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
