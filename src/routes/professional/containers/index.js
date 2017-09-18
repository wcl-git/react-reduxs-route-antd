import { connect } from 'react-redux'
import moment from 'moment'
import { 
  getProfessional, 
  toggleForm, 
  saveFormData,
  updateFormData
} from '../modules'
import { AuditPopover } from 'zcy-common'
import dumbComp from '../components'

const mapDispatchToProps = {
  getProfessional: (params) => getProfessional(params),
  toggleForm: () => toggleForm(),
  saveFormData: (params) => saveFormData(params),
  updateFormData: (params) => updateFormData(params),
  getAgencyAuditInfo: (params) => AuditPopover.getAgencyAuditInfo(params),
}

const sexRadioMap = {
  0: '男',
  1: '女'
}

const radioMap = {
  0: '否',
  1: '是'
}

const mapStateToProps = state => {
  const professional = state.professional;
  const formData = professional.formData;
  let userId = state.layout.USER.userId;
  formData.sex && (formData.sex.text = sexRadioMap[formData.sex.value])
  formData.isTempJob && (formData.isTempJob.text = sexRadioMap[formData.isTempJob.value])
  formData.isExternalStaff && (formData.isExternalStaff.text = sexRadioMap[formData.isExternalStaff.value])
  formData.isMiddle && (formData.isMiddle.text = sexRadioMap[formData.isMiddle.value])
  formData.isSecurity && (formData.isSecurity.text = sexRadioMap[formData.isSecurity.value])
  formData.isOrgTrain && (formData.isOrgTrain.text = sexRadioMap[formData.isOrgTrain.value])
  formData.isWork && (formData.isWork.text = sexRadioMap[formData.isWork.value])
  formData.address && (formData.address.text = (formData.bizDistrictFullName && formData.bizDistrictFullName.value))
  return {
    formData: {
      ...formData
    },
    editEnable: professional.editEnable,
    auditEnable: professional.auditEnable,
    pageType: professional.pageType,
    userId,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
