import { connect } from 'react-redux'
import { getData, removeData, audit, reject, initForm } from '../modules/index'
import branchAuditList from '../components/index'

const mapDispatchToProps = {
    init: (params) => getData(params),
    remove: (id) => removeData(id),
    audit: (id) => audit(id),
    initForm: ()=>initForm()
}

const mapStateToProps = (state) => ({
    list: state.branchAuditList.list,
    total: state.branchAuditList.total,  
    data: state.branchAuditList.data
})

export default connect(mapStateToProps, mapDispatchToProps)(branchAuditList)