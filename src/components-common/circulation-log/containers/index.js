import { connect } from 'react-redux'
import dumbComp from '../components'

const mapDispatchToProps = {
}

const mapStateToProps = state => {
  let agencyCirculationLog = state.agencyCirculationLog
  
  return {
    agencyCirculationLog
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
