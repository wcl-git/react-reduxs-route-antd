import { connect } from 'react-redux'
import { getData } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  init: () => getData()
}

const mapStateToProps = state => {
  const { auditExplain } = state

  return auditExplain
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
