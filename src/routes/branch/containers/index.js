import { connect } from 'react-redux'
import { getData, editData, submitData, toggleEdit, saveData, updateFormData } from '../modules/index'
import branch from '../components/index'

const mapDispatchToProps = {
  init: (params) => getData(params),
  edit: () => editData(),
  submit: () => submitData(),
  save: (params) => saveData(params),
  toggleEdit: (flag) => toggleEdit(flag),
  updateFormData: (params) => updateFormData(params),
}

const mapStateToProps = (state) => {
  const { ...data } = state.branch.formData
  const { userId, categoryName } = state.layout.USER
  //地址
  if (data.area && data.area.value.text) {
    data.area.text = data.area.value.text
  }
  return {
    data,
    userId,
    categoryName,
    page: state.branch.page,
    loading: state.branch.loading,
    editEnable: state.branch.editEnable,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(branch)