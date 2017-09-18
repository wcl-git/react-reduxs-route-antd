import { connect } from 'react-redux'
import { getData, editData, submitData, toggleEdit, saveData, updateFormData, setUpdateFlag } from '../modules/index'
import minorPersonnel from '../components/index'

const mapDispatchToProps = {
  init: (params) => getData(params),
  edit: () => editData(),
  submit: () => submitData(),
  save: (params) => saveData(params),
  toggleEdit: (flag) => toggleEdit(flag),
  updateFormData: (params) => updateFormData(params),
  setUpdateFlag: (flag) => setUpdateFlag(flag),
}

const mapStateToProps = (state) => {
  const { ...data } = state.minorPersonnel.formData
  return {
    data,
    isUpdate: state.minorPersonnel.isUpdate,
    page: state.minorPersonnel.page,
    isUpdate: state.minorPersonnel.isUpdate,
    loading: state.minorPersonnel.loading,
    editEnable: state.minorPersonnel.editEnable,
    detailPage: state.minorPersonnel.detailPage,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(minorPersonnel)