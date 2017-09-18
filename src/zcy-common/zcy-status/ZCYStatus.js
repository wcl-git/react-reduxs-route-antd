import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './ZCYStatus.less';
import StatusImage from './assets/state-badge.png'
export default class ZCYStatus extends Component {
  static defaultProps = {
    prefixCls: 'zcy-status',
    textColor: 'primary'
  }

  static propTypes = {
    textColor: PropTypes.string,
    status: PropTypes.string,
    statusTip: PropTypes.string,
    statusBadge: PropTypes.string
  }

  render() {
    const {prefixCls, textColor, status, statusTip, statusBadge, children, ...props} = this.props;

    let textColorString = classNames({
      [`${prefixCls}-text`]: true,
      [`text-color-${textColor}`]: textColor ? true : false
    })
    
    let childrenClone = React.Children.map(children, (elem, index) => {
      return React.cloneElement(elem, {
        key: index,
        className: classNames(elem.props.className, `${prefixCls}-btn-item`)
      })
    })
      
    return (
      <div className={`${prefixCls}`} {...props}>
        <img className={`${prefixCls}-badge`} src={statusBadge ? statusBadge : StatusImage} alt=""/>
        <div className={`${prefixCls}-btn-wrap`}>
          {childrenClone}
        </div>
        <span className={textColorString}>{status}</span>
        <p className={`${prefixCls}-tip`}>{statusTip}</p>
      </div>
    )
  }
}