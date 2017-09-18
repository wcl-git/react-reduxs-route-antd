import { connect } from 'react-redux'
import { getApprovalList, dispose } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  getApprovalList: params => getApprovalList(params),
  dispose: (params) => dispose(params)
}

const mapStateToProps = state => {
  let data = state.approvalList
  return {
    approvalList: data.approvalList,
    total: data.total
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
