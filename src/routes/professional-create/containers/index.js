import { connect } from 'react-redux'
import { getProfessionalUserList, addProfessional } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  getProfessionalUserList: params => getProfessionalUserList(params),
  addProfessional: params => addProfessional(params)
}

const mapStateToProps = state => {
  let professionalCreate = state.professionalCreate;

  return {
    professionalUserList: professionalCreate.professionalUserList,
    total: professionalCreate.total
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
