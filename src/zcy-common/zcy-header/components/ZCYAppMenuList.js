import React, { Component } from 'react';

export default class ZCYAppMenuList extends Component {
  state = {
    prefixCls: 'zcy-app-menu'
  }

  render() {
    const { appMenus } = this.props;
    const { prefixCls } = this.state;
    
    return (
      <div className={`${prefixCls} clearfix`} role="app-menu">
        {appMenus.appList.map((item, index) => {
          return <a target="_blank" key={index} className={`${prefixCls}-item`} role="app-menu-item" href={item.app.url}>{item.app.name}</a>
        })}
      </div>
    )
  }
};