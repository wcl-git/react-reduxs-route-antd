import { connect } from 'react-redux'
import  component from '../components/index'
import { 
  getSpecific, 
  updateCredit, 
  toggleForm, 
  getSpecificTrees, 
  updateFormData,
  getDraftDetail
} from '../modules'

const mapDispatchToProps = {
  getSpecific: (params) => getSpecific(params),
  updateCredit: (params) => updateCredit(params),
  toggleForm: () => toggleForm(),
  getSpecificTrees: () => getSpecificTrees(),
  updateFormData: (params) => updateFormData(params),
  getDraftDetail: (params) => getDraftDetail(params)
}

const radioMap = {
  0: '否',
  1: '是'
}

const mapStateToProps = (state) => {
  const certificateSpecific = state.certificateSpecific;
  const formData = certificateSpecific.formData;
  formData.isRenewal && (formData.isRenewal.text = radioMap[formData.isRenewal.value]);
  if (!formData.AGE_ORG_SPECIFIC_QUALIFIED_FILE) {
    formData.AGE_ORG_SPECIFIC_QUALIFIED_FILE = {
      value: formData.filemanageMaps.value.AGE_ORG_SPECIFIC_QUALIFIED_FILE
    }
    formData.AGE_ORG_AGENCY_CERTIFICATE_FILE = {
      value: formData.filemanageMaps.value.AGE_ORG_AGENCY_CERTIFICATE_FILE
    }
    formData.AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE = {
      value: formData.filemanageMaps.value.AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE
    }
  } else if(!formData.AGE_ORG_SPECIFIC_QUALIFIED_FILE.value) {
    formData.AGE_ORG_SPECIFIC_QUALIFIED_FILE = {
      value: formData.filemanageMaps.value.AGE_ORG_SPECIFIC_QUALIFIED_FILE
    }
    formData.AGE_ORG_AGENCY_CERTIFICATE_FILE = {
      value: formData.filemanageMaps.value.AGE_ORG_AGENCY_CERTIFICATE_FILE
    }
    formData.AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE = {
      value: formData.filemanageMaps.value.AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE
    }
  }
  const userId = state.layout.USER.userId;
  return ({
    formData: {
      ...formData
    },
    userId,
    editEnable: certificateSpecific.editEnable,
    auditEnable: certificateSpecific.auditEnable,
    pageType: certificateSpecific.pageType
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
