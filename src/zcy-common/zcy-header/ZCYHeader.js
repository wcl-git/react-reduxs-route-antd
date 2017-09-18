import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ZCYIcon from '../zcy-icon';
import { Menu, Dropdown, Icon, Button, Badge, Popover } from 'zcy-antd';
//import AppMenu from './appMenu/index'
import { ZCYAppMenuList, ZCYUserInfo, ZCYMessageList } from './components';
import './header.less';



const appMenuData = {
  title: '网超',
  appMenuList: [{
    title: '协议入围',
    href: 'http://www.taobao.com/'
  },{
    title: '反向竞价',
    href: 'http://www.taobao.com/'
  }]
}

export default class ZCYHeader extends Component {
  state = {
    color: ['#f9aa74', '#fdd97a', '#a8d284', '#92d3f4'],
    cameraContent: '视频文档',
    appMenuData
  }

  static defaultProps = {
    prefixCls: 'zcy-header'
  }

  static propTypes = {
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    left: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }

  render() {
    const { appMenus, userIdentity, backLogTodo, prefixCls } = this.props;

    let currentUserIdentity = userIdentity.filter((obj, index) => {
      if(obj.currentFlag) {
        obj.order = index;
        return true
      }
      return false
    })[0];

    return (
      <div className={`${prefixCls}`} style={{left: this.props.left}}>
        <div className={`${prefixCls}-nav-wrapper clearfix`}>
          <div className={`${prefixCls}-nav`}>
            <Dropdown overlay={
              <ZCYAppMenuList
                appMenus={appMenus}
                ></ZCYAppMenuList>
              } getPopupContainer={() => document.querySelector(`.${prefixCls}`)}>
              <a className={`${prefixCls}-app-menu-dropdown`} href="javascript:;">{this.state.appMenuData.title}<Icon type="down" style={{ marginLeft: '45px', fontSize: '12px' }} /></a>
            </Dropdown>
          </div>
          <div className={`${prefixCls}-nav ${prefixCls}-nav-right`}>
            <Button type="ghost" size="large" className={`${prefixCls}-back-store`}>&lt;返回电子卖场</Button>
            <Dropdown overlay={
              <ZCYMessageList
                title="待办"
                moreHref="http://middle.dev.cai-inc.com/dashboard/todo"
                dataList={backLogTodo.backlogs}
                ></ZCYMessageList>
              } getPopupContainer={() => document.querySelector(`.${prefixCls}`)}>
              <a className={`${prefixCls}-nav-dropdown active`} href="javascript:;">
                <Icon type="mail" style={{ marginRight: '5px' }}/><Badge count={backLogTodo.backlogCount} />
              </a>
            </Dropdown>
            <Dropdown overlay={
              <ZCYMessageList
                title="消息"
                moreHref="http://middle.dev.cai-inc.com/dashboard/message?read=false#unread"
                dataList={backLogTodo.messages}
                ></ZCYMessageList>
              } getPopupContainer={() => document.querySelector(`.${prefixCls}`)}>
              <a className={`${prefixCls}-nav-dropdown`} href="javascript:;">
                <Icon type="notification" style={{ marginRight: '5px' }}/><Badge count={backLogTodo.messageCount} />
              </a>
            </Dropdown>
            <Popover placement="bottom" content={this.state.cameraContent} getTooltipContainer={() => document.querySelector(`.${prefixCls}`)}>
              <a className={`${prefixCls}-nav-dropdown`} href="javascript:;">
                <Icon type="video-camera" />
              </a>
            </Popover>
            <Dropdown overlay={
              <ZCYUserInfo
                userIdentity={userIdentity}
                color={this.state.color}
                ></ZCYUserInfo>
              } getPopupContainer={() => document.querySelector(`.${prefixCls}`)}>
              <a className={`${prefixCls}-nav-dropdown`} href="javascript:;">
                <div className={`${prefixCls}-user-circle`}>
                  <ZCYIcon type="circle-bg" style={{color: currentUserIdentity && this.state.color[currentUserIdentity.order]}} />
                  <ZCYIcon type="user-info"/>
                </div>
                <div className={`${prefixCls}-user-info`}>
                  <div className={`${prefixCls}-user-name`}>{currentUserIdentity && currentUserIdentity.displayName}{currentUserIdentity && currentUserIdentity.entrustId && '(代办)'}<span className={`${prefixCls}-user-name-role`} style={{backgroundColor: currentUserIdentity && this.state.color[currentUserIdentity.order]}}>经办人</span></div>
                  <span className={`${prefixCls}-user-position`}>{currentUserIdentity && currentUserIdentity.orgName}{currentUserIdentity && currentUserIdentity.depName && `-${currentUserIdentity.depName}`}</span>
                </div>
                <Icon type="down" style={{ 'fontSize': '12px'}}/>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    )
  }
}
