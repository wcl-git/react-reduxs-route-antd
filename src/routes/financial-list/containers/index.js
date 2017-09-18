import { connect } from 'react-redux'
import { getData, removeData } from '../modules/index'
import financialList from '../components/index'
import { getInitTabProgress } from 'components-common/step-tab/modules'

const mapDispatchToProps = {
    init: (params) => getData(params),
    remove: (params) => removeData(params),
    getInitializeProgress: () => getInitTabProgress()
}

const mapStateToProps = (state) => {
    return {
        list: state.financialList.list
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(financialList)