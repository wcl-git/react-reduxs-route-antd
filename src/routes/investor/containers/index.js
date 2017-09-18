import { connect } from 'react-redux'
import {
  getInitConf,
  getAgeinvestordData,
  setAgeinvestordData,
  setEdit,
  duplexFormData
} from '../modules'
import dumbComp from '../components'
import moment from 'moment'

const mapDispatchToProps = {
  initConf: () => getInitConf(),
  init: params => getAgeinvestordData(params),
  saveFormData: data => setAgeinvestordData(data),
  toggleEdit: flag => setEdit(flag),
  duplexFormData: params => duplexFormData(params)
}

const typeMap = {
  '10': '企业法人',
  '11': '社会团体法人',
  '12': '事业法人',
  '13': '国家授权投资机构或部门',
  '2': '自然人',
  '14': '合伙企业'
}

const mapStateToProps = state => {
  const { investor } = state
  const { formData } = investor
  const timestamp = +formData.investTime || +new Date() //时间戳 毫秒
  //id investName type currency investAmount investRatio investTime remark
  formData.type && (formData.type.text = typeMap[formData.type.value])
  if (formData.investTime) {
    formData.investTime.value = new Date(timestamp)
    formData.investTime.text = moment(timestamp).format('YYYY-MM-DD')
  }

  return {
    currencyConf: investor.currencyConf,
    formData,
    page: investor.page,
    editEnable: investor.editEnable
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
