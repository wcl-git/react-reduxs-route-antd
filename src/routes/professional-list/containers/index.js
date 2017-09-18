import { connect } from 'react-redux'
import { getProfessionalList, dismissProfessional } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  getProfessionalList: params => getProfessionalList(params),
  dismissProfessional: params => dismissProfessional(params),
}

const mapStateToProps = state => {
  let data = state.professionalList;

  return {
    professionalList: data.professionalList,
    total: data.total
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
