import { connect } from 'react-redux'
import { getData, removeData, submit, initForm } from '../modules/index'
import branchList from '../components/index'

const mapDispatchToProps = {
    init: (params) => getData(params),
    remove: (id) => removeData(id),
    submit: (data) => submit(data),
    initForm: () => initForm()
}

const mapStateToProps = (state) => {
    const { categoryName } = state.layout.USER
    return {
        categoryName,
        list: state.branchList.list,
        total: state.branchList.total,
        data: state.branchList.data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(branchList)