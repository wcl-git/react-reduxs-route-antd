import { connect } from 'react-redux'
import reducer, { submit, sendVerifyCode } from '../modules/index'
import { injectReducer } from 'store/reducers'
import registerPolicy from '../components/index'

const mapDispatchToProps = {
 
}

const mapStateToProps = (state) => {
  return {
  }
}


export default (function (store) {
  injectReducer(store, { key: 'registerPolicy', reducer })
  return connect(mapStateToProps, mapDispatchToProps)(registerPolicy)
})
