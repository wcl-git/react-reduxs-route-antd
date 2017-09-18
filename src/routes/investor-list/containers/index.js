import { connect } from 'react-redux'
import {
  loadAccessory,
  uploadAccessory,
  toggleFormState,
  loadInvestorList,
  removeInvestorItem
} from '../modules'
import dumbComp from '../components'

const mapDispatchToProps = {
  loadAccessory: (params) => loadAccessory(params),
  saveFormData: params => uploadAccessory(params),
  toggleFormState: type => toggleFormState(type),
  initInvestorList: params => loadInvestorList(params),
  removeInvestorItem: params => removeInvestorItem(params)
}

const mapStateToProps = state => {
  const { layout, investorList } = state
  const USER = layout.USER
  return {
    formData: {
      fileList: {
        value: investorList.formData.fileList
      }
    },
    editEnable: investorList.editEnable,
    tableList: investorList.tableList,
    total: investorList.total,
    USER
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(dumbComp)
