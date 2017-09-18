import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class ZCYPanelHeader extends Component {
  static defaultProps = {
    prefixCls: 'zcy-panel-header'
  }

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    const { prefixCls, title, children, ...props } = this.props;

    let childrenClone = children && React.Children.map(children, (elem, index) => {
      return React.cloneElement(elem, {
        className: classNames(elem.props.className, `${prefixCls}-btn-item`)
      })
    })

    return (
      <div className={`${prefixCls}`} {...props}>
        <span className={`${prefixCls}-title`}>{ title }</span>
        <div className={`${prefixCls}-btn-wrapper`}>{ childrenClone }</div>
      </div>
    )
  }
}
