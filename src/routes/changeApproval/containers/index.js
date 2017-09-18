import { connect } from 'react-redux'
import { getProfessionalById } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  initLoad: params => getProfessionalById(params)
}

const mapStateToProps = state => ({
    professionalList: state.changeApprovalDetail
  })

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
