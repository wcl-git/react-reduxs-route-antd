import React, {Component} from 'react';
import './ZCYStepTab.less';


export default class ZCYStepTab extends Component {
  static defaultProps = {
    prefixCls: 'zcy-step-tab',
  }

  render() {
    const { prefixCls, children, ...props} = this.props;

    return (
      <div className={`${prefixCls} clearfix`} {...props}>
        { children }
      </div>
    )
  }
}