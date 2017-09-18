import { connect } from 'react-redux'
import dumbComp from '../components'
import { getInitTabProgress } from '../modules'

const mapDispatchToProps = {
  getInitTabProgress: () => getInitTabProgress()
}

const mapStateToProps = state => {
  let tabProgress = state.tabProgress
  let USER = state.layout.USER
  let agencyAuditBaseInfo = state.agencyAuditBaseInfo
  return {
    tabProgress,
    USER,
    agencyAuditBaseInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
