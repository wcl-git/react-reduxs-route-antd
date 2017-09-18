/***
 * @author chenkaixia
 * @description
 * 业务组件列表
 */
import React from 'react';
import {Table, Breadcrumb} from 'zcy-antd';
import {Search,ZCYPanel} from 'zcy-common';
import {Link} from 'react-router';

const columns = [
  {title: 'Full Name', width: 100, dataIndex: 'name', key: '10', fixed: 'left'},
  {title: 'Age', width: 100, dataIndex: 'age', key: '9', fixed: 'left'},
  {title: 'Column 1', dataIndex: 'address', key: '1'},
  {title: 'Column 2', dataIndex: 'address', key: '2'},
  {title: 'Column 3', dataIndex: 'address', key: '3'},
  {title: 'Column 4', dataIndex: 'address', key: '4'},
  {title: 'Column 5', dataIndex: 'address', key: '5'},
  {title: 'Column 6', dataIndex: 'address', key: '6'},
  {title: 'Column 7', dataIndex: 'address', key: '7'},
  {title: 'Column 8', dataIndex: 'address', key: '8'},
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <Link to="ZCYForm/123">跳转</Link>
  }
];

/**
 * 组件创建方法都是使用
 * @description
 * 组件的创建方式： class name  extends React.Component
 * 组件名称都是使用驼峰命名规则
 */
class ZCYTable extends React.Component {

  /**
   * 组件的属性校验
   */
  static propTypes = {
    search: React.PropTypes.func.isRequired,
    init: React.PropTypes.func.isRequired,
    list: React.PropTypes.array
  }
  /**
   * 组件的默认熟悉 如果需要
   */
  static defaultProps = {
    list: []
  }
  /**
   * state 默认值
   * @type {{headerHeight: number, contentHeight: number, width: number, collapsedWidth: number, marginLeft: number, collapsed: boolean, mode: string}}
   */
  state = {
    headerHeight: 60,
    contentHeight: 400,
    width: 200,
    collapsedWidth: 40,
    marginLeft: 200,
    collapsed: false,
    mode: 'inline',
  };

  componentDidMount() {
    this.props.init();
  }

  /**
   *  render 方法使用jsx语法实现，所有属性不要使用解构赋值，导致一些无关属性变化导致组件重新render。
   *  所有属性都做对齐
   *  所有的方法绑定
   */

  render() {
    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item><Link to="/table">我的面包屑</Link></Breadcrumb.Item>
          <Breadcrumb.Item><span>我的面包屑</span></Breadcrumb.Item>
        </Breadcrumb>
        <ZCYPanel>
        <Search search={this.props.search}
                reset={this.props.init}
        />
        <Table columns={columns}
               dataSource={this.props.list}
               scroll={{x: 1300}}
        />
        </ZCYPanel>
      </div>
    )
  }
}


export default ZCYTable
