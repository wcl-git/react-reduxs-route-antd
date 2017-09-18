import { connect } from 'react-redux'
import { getProfessionalDetailById } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  getProfessionalDetailById: params => getProfessionalDetailById(params)
}

const mapStateToProps = state => {
  const registerAudit = state.registerAudit;
  return {
    professionalDetail: registerAudit.professionalDetail,
    editEnable: registerAudit.editEnable,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
