import { connect } from 'react-redux'
import  component from '../components/index'
import { 
  getCredit, 
  updateCredit, 
  toggleForm, 
  getCreditTrees, 
  updateFormData,
  getDraftDetail
} from '../modules'

const mapDispatchToProps = {
  getCredit: (params) => getCredit(params),
  updateCredit: (params) => updateCredit(params),
  toggleForm: () => toggleForm(),
  getCreditTrees: () => getCreditTrees(),
  updateFormData: (params) => updateFormData(params),
  getDraftDetail: (params) => getDraftDetail(params)
}

const radioMap = {
  0: '否',
  1: '是'
}

const mapStateToProps = (state) => {
  const certificateCredit = state.certificateCredit;
  const formData = certificateCredit.formData;
  if (!formData.AGE_ORG_CREDIT_FILE) {
    formData.AGE_ORG_CREDIT_FILE = {
      value: formData.filemanageMaps.value.AGE_ORG_CREDIT_FILE
    }
  } else if(!formData.AGE_ORG_CREDIT_FILE.value) {
    formData.AGE_ORG_CREDIT_FILE = {
      value: formData.filemanageMaps.value.AGE_ORG_CREDIT_FILE
    }
  }
    
  const userId = state.layout.USER.userId;
  return ({
    formData: {
      ...formData
    },
    userId,
    editEnable: certificateCredit.editEnable,
    auditEnable: certificateCredit.auditEnable,
    pageType: certificateCredit.pageType
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
