import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from 'zcy-antd';
import ZCYIcon from '../zcy-icon';

export default class ZCYStepTabItem extends Component {
  static defaultProps = {
    prefixCls: 'zcy-step-tab-item',
    onlyTitle: false
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  static propTypes = {
    status: PropTypes.bool,
    onlyTitle: PropTypes.bool,
    to: PropTypes.any.isRequired,
    group: PropTypes.string.isRequired,
  }

  handleClick = () => {
    let router = this.context.router;
    router.push(this.props.to)
  }

  isActiveTab = () => {
    let router = this.context.router;
    let location = window.location;
    let hash = location.hash;
    return hash.startsWith(`#/${this.props.group}`)
  }

  render() {
    const { prefixCls, status, children, onlyTitle, ...props } = this.props;
    let wrapperClassString = classNames({
      [`${prefixCls}`]: true,
      active: this.isActiveTab()
    })

    let statusClassString = classNames({
      [`${prefixCls}-status`]: true,
      completed: status
    })

    let titleClassString = classNames({
      [`${prefixCls}-label`]: true,
      'only-title': onlyTitle
    })
    
    return (
      <div className={wrapperClassString} onClick={this.handleClick} {...props}>
        <p className={titleClassString}>{children}</p>
        {
          !onlyTitle && (<div className={statusClassString}><div className={`${prefixCls}-status-icon-wrapper`}><ZCYIcon type="circle-bg" /><Icon type="check" /></div>{ status ? '已完成' : '未完成'}</div>)
        }   
      </div>
    )
  }
}