import { connect } from 'react-redux'
import reducer from '../modules/index'
import { injectReducer } from 'store/reducers'
import register from '../components/index'

const mapDispatchToProps = {
 
}

const mapStateToProps = (state) => {
  let layout = state.layout;
  return {
    data: state.register.formData
  }
}


export default (function (store) {
  injectReducer(store, { key: 'register', reducer })
  return connect(mapStateToProps, mapDispatchToProps)(register)
})
