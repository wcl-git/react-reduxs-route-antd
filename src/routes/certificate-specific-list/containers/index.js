import { connect } from 'react-redux'
import { getSpecificList, specificListDelete } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  getSpecificList: params => getSpecificList(params),
  specificListDelete: params => specificListDelete(params)
}

const mapStateToProps = state => {
  let data = state.certificateSpecificList;
  let agencyAuditBaseInfo = state.agencyAuditBaseInfo
  return {
    tableList: data.tableList,
    total: data.total,
    agencyAuditBaseInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
