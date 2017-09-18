/**
 * Created by chenkaixia on 2017/7/4.
 */
import React from 'react';
import {Form} from 'zcy-antd';


class ZCYForm extends React.Component {
  static defaultProps = {
    auditEnable: false
  }
  static contextTypes = {
    form: React.PropTypes.object
  }
  static childContextTypes = {
    editEnable: React.PropTypes.bool,
    auditEnable: React.PropTypes.bool,
    auditType: React.PropTypes.string
  }

  getChildContext() {
    return {
      editEnable: this.props.editEnable,
      auditEnable: this.props.auditEnable,
      auditType: this.props.auditType
    }
  }
  shouldComponentUpdate(nextProps, nextState){
    if(!this.props.initData){
      return true;
    }
    if(nextProps.editEnable===false&&this.props.editEnable==false){
      return false;
    }
    return true;
  }

  render() {
    const {children, ...restProps} = this.props;
    return (
      <Form {...restProps}>
        {children}
      </Form>
    )
  }

}

export default ZCYForm
