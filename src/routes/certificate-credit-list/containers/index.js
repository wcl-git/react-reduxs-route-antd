import { connect } from 'react-redux'
import { getCreditList, creditListDelete } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  getCreditList: params => getCreditList(params),
  creditListDelete: params => creditListDelete(params)
}

const mapStateToProps = state => {
  let data = state.certificateCreditList;
  let agencyAuditBaseInfo = state.agencyAuditBaseInfo
  return {
    tableList: data.tableList,
    total: data.total,
    agencyAuditBaseInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
