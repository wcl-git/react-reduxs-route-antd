import React from 'react'
import PropTypes from 'prop-types'
import { Icon ,Modal} from 'zcy-antd';
import {ZCYHeader, ZCYMenus, Layout,Listener,eventEmitter} from 'zcy-common'
import refactorRoutes from './routes'
import './CoreLayout.less'
import 'styles/core.less'

const { Content, Sider } = Layout;




export default class CoreLayout extends React.Component {

  static propTypes = {
    children: PropTypes.element.isRequired
  }

  state = {
    headerHeight: 60,
    width: 200,
    collapsedWidth: 40,
    marginLeft: 200,
    headerLeft: 200,
    collapsed: false,
    mode: 'inline',
  };

  getMarginLeft = (collapsed) => {
    return collapsed ? this.state.collapsedWidth : this.state.width
  }

  updateDimensions = () => {
    const documentElement = document.documentElement
    const body = document.getElementsByTagName('body')[0]
    const clientHeight = window.innerHeight|| documentElement.clientHeight|| body.clientHeight
    this.setState({
      contentHeight: clientHeight - this.state.headerHeight,
      marginLeft: this.getMarginLeft(this.state.collapsed)
    })
    this.forceUpdate()
  }

  onCollapse = (collapsed) => {
    let sideLeft = this.getMarginLeft(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
      marginLeft: sideLeft,
      headerLeft: sideLeft,
    })
    this.forceUpdate()
  }

  componentDidMount(){
    this.updateDimensions();
    this.props.getMenus(refactorRoutes, window.location.origin, window.location.href);
    this.props.getBacklogTodo({
      data: {
        pageNo: 1,
        pageSize: 5
      }
    });
    this.props.getAppsBasicInfo();
    eventEmitter.addListener('ajaxError',()=>{
      Modal.error({
        title: '错误',
        content: '系统错误，操作失败！',
        okText:'确认'
      });
    });
    eventEmitter.addListener('ajaxWarning',(msg)=>{
      Modal.error({
        title: '提醒',
        content: msg,
        okText:'确认'
      });
    });
  }

  render() {
    const { menus, openKeys, backLogTodo, appsBasicInfo, hasUserInfo } = this.props;
    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="zcy-logo" style={{height: `${this.state.headerHeight}px`, width: `${this.state.width}px`}}>
            <Icon type="chrome" />
            <div className="zcy-logo-text">
              <p className="title">政府采购云平台</p>
              <p>{ appsBasicInfo.getMyDistrict.fullName }</p>
            </div>
          </div>
          <ZCYMenus openKeys={openKeys} menus={menus} mode={this.state.mode}/>
        </Sider>
        <Layout style={{marginLeft: `${this.state.marginLeft}px`}} className="root-content">
          <ZCYHeader height={this.state.headerHeight} left={this.state.headerLeft} appMenus={appsBasicInfo.getAppsByDimForFront} userIdentity={appsBasicInfo.getUserIdentity} backLogTodo={backLogTodo} />
          <Content style={{marginTop: `${this.state.headerHeight}px`}}>
            {
              hasUserInfo && this.props.children
            }
          </Content>

        </Layout>
      </Layout>
    )
  }
}



