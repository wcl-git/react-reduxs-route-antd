import { connect } from 'react-redux'
import { getApprovalPublicList, dispose } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  getApprovalPublicList: params => getApprovalPublicList(params),
  dispose: (params) => dispose(params)
}

const mapStateToProps = state => {
  let data = state.approvalPublicList
  return {
    approvalPublicList: data.approvalPublicList,
    total: data.total
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
