import React, {Component} from 'react';
import {Tabs} from 'zcy-antd';
import './ZCYTab.less';


class ZCYTab extends Component {
  static defaultProps = {
    prefixCls: 'zcy-tab',
  }

  render() {
    const { prefixCls, children, ...props} = this.props;

    return (
      <Tabs className={`${prefixCls}`} {...props}>
        { children }
      </Tabs>
    )
  }
}

export default ZCYTab