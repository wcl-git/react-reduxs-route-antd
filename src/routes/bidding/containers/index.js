import { connect } from 'react-redux'
import {
  getPlaceInfoById,
  postPlaceInfo,
  toggleFormState,
  duplexFormData
} from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  initLoad: params => getPlaceInfoById(params),
  saveFormData: data => postPlaceInfo(data),
  toggleFormState: flag => toggleFormState(flag),
  duplexFormData: params => duplexFormData(params)
}

const RadioMap = {
  '0': '否',
  '1': '是'
}

const siteTypeMap = {
  site_type_open: '开标室',
  site_type_inq: '询标室',
  site_type_review: '评审室',
  site_type_other: '其他'
}

const mapStateToProps = state => {
  const { USER } = state.layout // getEnvHref getMyDistrict getUserIdentity[]
  const { formData } = state.bidding

  // siteCode siteName siteType siteProv siteCity siteDist siteAddress
  // combineArea siteProportion maxCapacity
  // isMonitor isReview isOnline isOpen chargeStandard AGE_SITE_PHOTO
  formData.siteType &&
    (formData.siteType.text = siteTypeMap[formData.siteType.value])
  formData.combineArea &&
    formData.districtFullName &&
    (formData.combineArea.text = formData.districtFullName.value)
  formData.isMonitor &&
    (formData.isMonitor.text = RadioMap[formData.isMonitor.value])
  formData.isReview &&
    (formData.isReview.text = RadioMap[formData.isReview.value])
  formData.isOnline &&
    (formData.isOnline.text = RadioMap[formData.isOnline.value])
  formData.isOpen && (formData.isOpen.text = RadioMap[formData.isOpen.value])
  formData.chargeStandard &&
    (formData.chargeStandard.text = `${formData.chargeStandard.value} 元/小时`)

  return {
    formData,
    page: state.bidding.page,
    auditEnable: state.bidding.auditEnable,
    editEnable: state.bidding.editEnable,
    USER
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
