import React, {Component} from 'react';
import './ZCYContainer.less'
export default class ZCYContainer extends Component {
  static defaultProps = {
    prefixCls: 'zcy-container',
  }

  render() {
    const { prefixCls, children, ...props } = this.props

    return (
      <div className={`${prefixCls} clearfix`} {...props}>
        { children }
      </div>
    )
  }
}