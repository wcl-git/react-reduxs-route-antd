import { connect } from 'react-redux'
import  component from '../components/index'
import { 
  updateCertificate, 
  getCertificate, 
  toggleForm, 
  changeRadio,
  updateFormData
} from '../modules'

const mapDispatchToProps = {
  getCertificate: (params) => getCertificate(params),
  updateCertificate: (params) => updateCertificate(params),
  toggleForm: () => toggleForm(),
  changeRadio: (type) => changeRadio(type),
  updateFormData: (params) => updateFormData(params)
}

const industrialRadioMap = {
  0: '非个体工商户',
  1: '个体工商户',
}

const radioMap = {
  0: '否',
  1: '是',
}

const mapStateToProps = (state) => {
  const data = state.certificateBase;
  const { organizationData, businessData, taxData, InsuranceData, ...rest } = data;
  const userId = state.layout.USER.userId;
  const orgId = state.layout.USER.orgId;
  const agencyAuditBaseInfo = state.agencyAuditBaseInfo
  businessData && businessData.isIndustrialAndCommercial && (businessData.isIndustrialAndCommercial.text = industrialRadioMap[businessData.isIndustrialAndCommercial.value]);
  taxData && taxData.isScottare && (taxData.isScottare.text = radioMap[taxData.isScottare.value])
  InsuranceData && InsuranceData.isPaySocialfunds && (InsuranceData.isPaySocialfunds.text = radioMap[InsuranceData.isPaySocialfunds.value])
  return {
    organizationData: {
      ...organizationData
    },
    businessData: {
      ...businessData
    },
    taxData: {
      ...taxData
    },
    InsuranceData: {
      ...InsuranceData
    },
    ...rest,
    userId,
    orgId,
    agencyAuditBaseInfo
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)
