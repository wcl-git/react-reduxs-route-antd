import { connect } from 'react-redux'
import {
  loadAgencyDetail,
  saveAgencyOrganic,
  setEdit,
  duplexFormData,
  setBizId
} from '../modules'
import { setAgencyAuditBaseInfo } from 'components-common/set-audit-base-info/modules'
import { AuditPopover } from 'zcy-common'
import dumbComp from '../components/index'
import moment from 'moment'

const mapDispatchToProps = {
  loadAgencyInfo: params => loadAgencyDetail(params),
  saveAgencyOrganic: data => saveAgencyOrganic(data),
  toggleFormState: flag => setEdit(flag),
  duplexFormData: params => duplexFormData(params),
  setAgencyAuditBaseInfo: (params) => setAgencyAuditBaseInfo(params),
  getAgencyAuditInfo: (params) => AuditPopover.getAgencyAuditInfo(params)
}

const agencyRadioMap = {
  sub_company: '分公司',
  son_comapny: '子公司',
  office: '办事处',
  other: '其他'
}

const RadioMap = {
  '0': '否',
  '1': '是'
}

const mapStateToProps = state => {
  const { USER } = state.layout // getEnvHref getMyDistrict getUserIdentity[]
  const { formData } = state.organic
  const timestamp = +formData.inceptionDate || +new Date() //时间戳 毫秒
  const agencyAuditBaseInfo = state.agencyAuditBaseInfo
  formData.subordination &&
    (formData.subordination.text = agencyRadioMap[formData.subordination.value])

  if (formData.inceptionDate) {
    formData.inceptionDate.value = new Date(timestamp)
    formData.inceptionDate.text = moment(timestamp).format('YYYY-MM-DD')
  }
  formData.combineArea &&
    formData.bizDistrictFullName &&
    (formData.combineArea.text = formData.bizDistrictFullName.value)

  formData.isTaxation &&
    (formData.isTaxation.text = RadioMap[formData.isTaxation.value])
  formData.isPaySecurity &&
    (formData.isPaySecurity.text = RadioMap[formData.isPaySecurity.value])
  formData.isInfraction &&
    (formData.isInfraction.text = RadioMap[formData.isInfraction.value])

  let changeFullName = false
  if (formData.fullName && formData.fullNameCache !== formData.fullName.value) {
    changeFullName = true
  }

  return {
    formData,
    auditEnable: state.organic.auditEnable,
    editEnable: state.organic.editEnable,
    USER,
    changeFullName,
    agencyAuditBaseInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
