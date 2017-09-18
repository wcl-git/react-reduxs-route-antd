import { connect } from 'react-redux'
import { getData, editData, toggleEdit, saveData, getProUser, updateFormData } from '../modules/index'
import monent from 'moment'
import achievement from '../components/index'

const mapDispatchToProps = {
  init: (params) => getData(params),
  edit: () => editData(),
  save: (params) => saveData(params),
  setPage: (operation) => setPage(operation),
  toggleEdit: (flag) => toggleEdit(flag),
  getProUser: () => getProUser(),
  updateFormData: (params) => updateFormData(params),
}

const mapStateToProps = (state) => {
  let { ...data } = state.achievement.formData
  const { userId } = state.layout.USER

  data.budgetAmount && (data.budgetAmount.text = data.budgetAmount.value + '万元')
  data.dealAmount && (data.dealAmount.text = data.dealAmount.value + '万元')
  data.saveRate && (data.saveRate.text = data.saveRate.value + '%')
  //地址
  if (data.area && data.area.value.text) {
    data.area.text = data.area.value.text
  }

  return {
    userId,
    data,
    page: state.achievement.page,
    address: state.achievement.address,
    isUpdate: state.achievement.isUpdate,
    loading: state.achievement.loading,
    editEnable: state.achievement.editEnable,
    address: state.achievement.address,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(achievement)