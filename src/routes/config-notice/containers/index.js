import { connect } from 'react-redux'
import { getNoticeConf, saveNoticeConf, duplexFormData } from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  getConf: () => getNoticeConf(),
  saveConf: data => saveNoticeConf(data),
  duplexFormData: (params, key) => duplexFormData(params, key)
}

const mapStateToProps = state => {
  const { registerConf, modifyConf } = state.configNotice

  return state.configNotice
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
