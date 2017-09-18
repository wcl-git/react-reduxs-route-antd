import { connect } from 'react-redux'
import { getAduitLoggingList, cancelAduitItem } from '../modules'
import dumbComp from '../components'

const mapStateToProps = state => {
  const { auditLoggingList } = state
  return {
    tableList: auditLoggingList.tableList,
    total: auditLoggingList.total
  }
}

const mapDispatchToProps = {
  loadApprovalList: () => getAduitLoggingList(),
  recallItem: params => cancelAduitItem(params)
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
