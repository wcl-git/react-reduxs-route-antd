import React, { Component } from 'react'
import classNames from 'classnames'
import { Steps } from 'zcy-antd'
import './ZCYVsteps.less'

export default class ZCYVsteps extends Component {
  static Step = Steps.Step

  static defaultProps = {
    prefixCls: 'zcy-steps',
    size: 'small',
    direction: 'vertical'
  }

  render() {
    const { prefixCls, children, ...restProps } = this.props

    const steps = React.Children.map(children, (ele, idx) =>
      React.cloneElement(ele, {
        status: 'process',
        k: idx,
        className: classNames({
          [`${prefixCls}-item-notitle`]: !ele.props.title
        })
      })
    )
    return (
      <Steps className="zcy-steps-container" {...restProps}>
        {steps}
      </Steps>
    )
  }
}
