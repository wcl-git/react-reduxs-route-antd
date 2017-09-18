import React, { Component } from 'react';
import './ZCYPanel.less';

export default class ZCYPanelBody extends Component {
  static defaultProps = {
    prefixCls: 'zcy-panel-body'
  }

  render() {
    const { prefixCls, children,  ...props } = this.props;

    return (
       <div className={`${prefixCls}`} {...props}>
          { children }
       </div>
    )
  }
}