import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MessageList extends Component {
  state = {
    prefixCls: 'zcy-message-menu'
  }

  static defaultProps = {
    prefixCls: 'zcy-status',
    textColor: 'primary'
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    moreHref: PropTypes.string.isRequired,
    dataList: PropTypes.array,
    //msgList: PropTypes.array.isRequired,
  }

  render() {
    const { title, dataList, moreHref } = this.props;
    const { prefixCls } = this.state;

    return (
      <div className={`${prefixCls}`} role="message-list" style={{ width : '370px'}}>
        <h4 className={`${prefixCls}-header`}><i className="badge-block"></i>{title}</h4>
        {
          dataList.map((item, index) => {
            return <a target="_blank" key={index} className={`${prefixCls}-item`} role="message-list-item" href={item.callbackUrl}>{item.title}<span className={`${prefixCls}-item-time`}>5小时前</span></a>
          })
        }
        <a target="_blank" className={`${prefixCls}-footer`} href={moreHref}>查看更多&gt;</a>
      </div>
    );
  }
} 