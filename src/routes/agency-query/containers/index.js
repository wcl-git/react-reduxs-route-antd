import { connect } from 'react-redux'
import { getData, removeData } from '../modules/index'
import agencyQuery from '../components/index'

const mapDispatchToProps = {
    init: (params) => getData(params),
    remove: (id) => removeData(id),
}

const mapStateToProps = (state) => ({
    list: state.agencyQuery.list,
    total: state.agencyQuery.total
})

export default connect(mapStateToProps, mapDispatchToProps)(agencyQuery)