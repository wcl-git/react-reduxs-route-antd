import { connect } from 'react-redux'
import { getData ,setEdit} from '../modules/index'
import ZCYForm from '../components/index'

const mapDispatchToProps = {
  init : (id) => getData(id),
  edit:()=>setEdit()
}

const myRadioMap = {
      1:"A",
      2:"B",
      3:"C",
      4:"D"
}


const mapStateToProps = (state) => {
  return ({
    formData : {
      email:{
        value: state.ZCYForm.formData.email,
      },
      userName:{
        value:state.ZCYForm.formData.userName,
      },
      startDate:{
        value:state.ZCYForm.formData.startDate
      },
      inputNumber:{
        value:state.ZCYForm.formData.inputNumber,
      },
      myRadio:{
        value:state.ZCYForm.formData.myRadio,
        text:myRadioMap[state.ZCYForm.formData.myRadio]
      },
      select:{
        value:state.ZCYForm.formData.select,
      },
      area:{
        value:state.ZCYForm.formData.area,
        text:'内蒙古自治区1/呼和浩特市1/新城区1'
      },
    },
    loading:state.ZCYForm.loading,
    editEnable:state.ZCYForm.editEnable
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ZCYForm)
