import React, { Component } from 'react';
import ZCYIcon from '../../zcy-icon';
import { Icon } from 'zcy-antd';

export default class ZCYUserInfo extends Component {
  state = {
    prefixCls: 'zcy-user-menu'
  }

  render() {
    const { userIdentity, color } = this.props;
    const { prefixCls } = this.state;

    return (
      <div className={`${prefixCls}-wrap`}>
        <ul className={`${prefixCls}-list-wrap`}>
          {
            userIdentity && userIdentity.length > 1 && userIdentity.map((identity, index) => {
              return (
                <li key={+new Date() + index}>
                  <div className={`${prefixCls}-list-item`}>
                    <div className="zcy-header-user-circle">
                      <ZCYIcon type="circle-bg" style={{color: color[index % 4]}}/>
                      <ZCYIcon type="user-info"/>
                    </div>
                    <div className={`${prefixCls}-info-wrap`}>
                      <p className="user-name">{identity.userDisplayName}{identity.entrustId && '(代办)'}</p>
                      <p className="user-position">{identity.orgName}{identity.categoryDisplayName}</p>
                    </div>
                    {
                      identity.currentFlag && <Icon type="check-circle" style={{lineHeight: '60px', fontSize: '22px'}} />
                    }
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className={`${prefixCls}-operation-wrap`}>
          <ul className={`${prefixCls}-operation-list`}>
            <li><a href="javascript:;"><Icon type="setting" />账号信息</a></li>
            <li><a href="javascript:;"><ZCYIcon type="header-position" />指定代办</a></li>
          </ul>
          <a href="javascript:;" className="ant-btn zcy-logout-btn">退出</a>
        </div>
      </div>
    )
  }
};