import { connect } from 'react-redux'
import { getData, removeData, switchPerformanceType, withdraw } from '../modules/index'
import achievementList from '../components/index'

const mapDispatchToProps = {
    init: (params) => getData(params),
    remove: (params) => removeData(params),
    switchPerformanceType: (type) => switchPerformanceType(type),
    switchPerformanceType: (type) => switchPerformanceType(type),
    withdraw: withdraw()
}

const mapStateToProps = (state) => {
    return ({
        list: state.achievementList.list,
        performanceType: state.achievementList.performanceType,
        total: state.achievementList.total
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(achievementList)