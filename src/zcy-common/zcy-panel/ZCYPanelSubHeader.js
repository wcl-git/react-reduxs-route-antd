import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

export default class ZCYPanelSubHeader extends Component {
  static defaultProps = {
    prefixCls: 'zcy-panel-sub-header'
  }
  static propTypes = {
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    title: PropTypes.string.isRequired,
    tip: PropTypes.string,
  }
  render() {
    const { prefixCls, title, tip, order, children, ...props } = this.props
    let childrenClone = children && React.Children.map(children, (elem, index) => {
      return React.cloneElement(elem, {
        className: classNames(elem.props.className, `${prefixCls}-btn-item`)
      })
    })

    return (
      <div className={`${prefixCls}`} {...props}>
        <span className={`${prefixCls}-title`}>
          {order &&
            typeof order !== 'boolean' &&
            <span className={`${prefixCls}-title-group-order`}>
              {order}
            </span>}
          {title}
        </span>
        { tip && <span className={`${prefixCls}-tip`}>{tip}</span>}
        <div className={`${prefixCls}-btn-wrapper`}>
          {childrenClone}
        </div>
      </div>
    )
  }
}
