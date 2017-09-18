import { connect } from 'react-redux'
import { getAduitPostil, getAduitLoggingList } from '../modules'
import dumbComp from '../components'

const mapStateToProps = state => {
  const { auditLogging } = state
  return {
    postil: auditLogging.postil,
    tableList: auditLogging.tableList
  }
}

const mapDispatchToProps = {
  LoadPostilInfo: approvalId => getAduitPostil(approvalId),
  loadLoggingInfo: approvalId => getAduitLoggingList(approvalId)
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
