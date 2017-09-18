import { connect } from 'react-redux'
import { getFormData, toggleEdit, saveData, removeData, getMinorData, updateFormData, setUpdateFlag } from '../modules/index'
import keyPersonnel from '../components/index'

const mapDispatchToProps = {
  init: (params) => getFormData(params),
  toggleEdit: (type, flag) => toggleEdit(type, flag),
  remove: (params) => removeData(params),
  save: (data) => saveData(data),
  initMinor: (params) => getMinorData(params),
  updateFormData: (params) => updateFormData(params),
  setUpdateFlag: (flag) => setUpdateFlag(flag),
}

const mapStateToProps = (state) => {
  const { userId } = state.layout.USER

  let {
    legalData,
    systemData,
    financialData,
    techniqueData,
    minorList,
    minorTotal,
    systemEditEnable,
    legalEditEnable,
    techniqueEditEnable,
    financialEditEnable } = state.keyPersonnel

  const sexRadioMap = {
    0: '男',
    1: '女'
  }

  const mapEducateLevel = {
    12: '博士后',
    13: '博士',
    14: '硕士',
    28: '相当大学毕业',
    31: '专科毕业',
    61: '高中毕业',
    20: '大学本科'
  }

  let handleData = (data) => {
    //男女
    data.gender && (data.gender.text = sexRadioMap[data.gender.value])
    data.educateLevel && (data.educateLevel.text = mapEducateLevel[data.educateLevel.value])
  }

  [legalData, techniqueData, legalData, systemData].forEach((item) => {
    handleData(item)
  })

  //地址

  if (legalData.area) {
    if (typeof legalData.area.value === 'object' && legalData.area.value.text) {
      legalData.area.text = legalData.area.value.text
    }
  }

  if (techniqueData.area) {
    if (typeof techniqueData.area.value === 'object' && techniqueData.area.value.text) {
        techniqueData.area.text = techniqueData.area.value.text
    }
  
  }
  if (financialData.area) {
    if (typeof financialData.area.value === 'object' && financialData.area.value.text) {
      financialData.area.text = financialData.area.value.text
    }
  }

  if (systemData.area) {
    if (typeof systemData.area.value === 'object' && systemData.area.value.text) {
      systemData.area.text = systemData.area.value.text
    }
  }

  return {
    userId,
    systemData: { ...systemData },
    financialData: { ...financialData },
    legalData: { ...legalData },
    techniqueData: { ...techniqueData },
    minorList,
    minorTotal,
    list: state.keyPersonnel.list,
    isUpdate: state.keyPersonnel.isUpdate,
    systemEditEnable,
    legalEditEnable,
    techniqueEditEnable,
    financialEditEnable,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(keyPersonnel)