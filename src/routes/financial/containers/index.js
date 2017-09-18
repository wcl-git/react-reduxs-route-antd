import { connect } from 'react-redux'
import { getData, editData, submitData, toggleEdit, saveData, updateFormData, setUpdateFlag } from '../modules/index'
import financial from '../components/index'

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
  const { ...data } = state.financial.formData
  const { userId } = state.layout.USER
  data.totalAssets && (data.totalAssets.text = data.totalAssets.value + '万元')
  data.investmentAbroad && (data.investmentAbroad.text = data.investmentAbroad.value + '万元')
  data.ownershipinterest && (data.ownershipinterest.text = data.ownershipinterest.value + '万元')
  data.totalLiabilitie && (data.totalLiabilitie.text = data.totalLiabilitie.value + '万元')
  data.capitalAmount && (data.capitalAmount.text = data.capitalAmount.value + '万元')
  data.totalProfit && (data.totalProfit.text = data.totalProfit.value + '万元')

  data.salesMoney && (data.salesMoney.text = data.salesMoney.value + '万元')
  data.totalProfit && (data.totalProfit.text = data.totalProfit.value + '万元')
  data.taxPaid && (data.taxPaid.text = data.taxPaid.value + '万元')
  data.incomeTax && (data.incomeTax.text = data.incomeTax.value + '万元')
  data.netProfit && (data.netProfit.text = data.netProfit.value + '万元')

  if (data.totalLiabilitie && data.totalAssets) {
    data.assetLiabilityRatio.value = (data.totalLiabilitie.value / data.totalAssets.value * 100).toFixed(2) + '%'
  }
  if (data.taxPaid && data.salesMoney) {
    data.salesProfitMargin.value = (data.taxPaid.value / data.salesMoney.value * 100).toFixed(2) + '%'
  }

  return {
    data,
    userId,
    isUpdate: state.financial.isUpdate,
    modalConfig: state.financial.modalConfig,
    loading: state.financial.loading,
    editEnable: state.financial.editEnable,
    page: state.financial.page,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(financial)