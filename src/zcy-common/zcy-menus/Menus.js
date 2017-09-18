/**
 * 菜单数据从后端接口获取
 * 由于当前用户的权限问题，可能会包含其他模块的菜单，所以需要将菜单进行区分。
 *
 * 根据当前的浏览器地址确定当前展开和选中的菜单项
 *
 * 区分前提：每个模块的域名不同，
 * 区分原则：根据域名匹配，如果是当前域名的链接，都修改为相对路径，通过router跳转
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'zcy-antd'
import { Link } from 'react-router'
import ZCYIcon from '../zcy-icon'

const { SubMenu } = Menu

const ZCYSubMenus = (props) => (
  props.child && props.child.length ? <SubMenu
    key={props.key}
    title={<div>
        <div className="ant-menu-active-border"></div>
        <ZCYIcon hasIcon={true} type={props.icon}/>
        <span className="nav-text">{props.name}</span>
      </div>
  }>
    {props.child.map((item, index) => {
      return <Menu.Item key={item.key}>
        {
          item.router
          ? <Link to={item.href}>{item.name}</Link>
          : <a href={item.href}>{item.name}</a>
        }
      </Menu.Item>
    })}
  </SubMenu> : <Menu.Item key={props.key}>
    <ZCYIcon hasIcon={true} type={props.icon}/>
    {
      props.router
      ? <Link className="nav-text zcy-primary-nav-link" to={props.href}>{props.name}</Link>
      : <a className="nav-text zcy-primary-nav-link" href={props.href}>{props.name}</a>
    }
  </Menu.Item>
)

export default class ZCYMenus extends React.Component {
  static defaultProps = {
    // 本地域名
    //origin: window.location.origin,
    mode: 'inline',
  }

  static propTypes = {
    //origin: PropTypes.string,
    // 存储重构的菜单
    //routes: PropTypes.array,
    menus: PropTypes.array,
    openKeys: PropTypes.array,
  }

  state = {
    menus: [],
    openKeys: [],
    href: window.location.href
  }

  /**
   * 初始化菜单数据
   */
  componentDidMount() {
    // getMenus(this.props.routes, this.props.origin, this.state.href)
    // .then((data) => {
    //   const {menus, openKeys} = data
    //   this.setState({ menus, openKeys })
    // })
  }

  render() {
    if (!this.props.menus || !this.props.menus.length) {
      return <span></span>
    }

    return (
      <Menu
        theme="dark"
        mode={this.props.mode}
        defaultOpenKeys={this.props.openKeys}
        defaultSelectedKeys={[this.state.href]}
        style={{height: '100%', overflow: 'auto'}}
      >
        {
          this.props.menus.map((subMenu)=>{
            return ZCYSubMenus({ ...subMenu })
          })
        }
      </Menu>
    )
  }
}
