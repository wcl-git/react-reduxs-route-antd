import React, { Component, createStore } from 'react'
import { Table, Button, Form, Row, Col } from 'zcy-antd'
import { ZCYPanel, ZCYStatus, ZCYContainer, ZCYTab, ZCYSearch } from 'zcy-common'
import PropTypes from 'prop-types'
import { Link } from 'react-router'

class agencyQuery extends Component {

  constructor(props) {
    super(props)

    //分页state
    this.state = {
      tableConfig: {
        onChange: this.paginationChange,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        showQuickJumper: true,
        showTotal: this.showTotal
      }
    }

    this.columns = [{
      title: '机构名称',
      dataIndex: 'fullName',
      fixed: 'left',
    }, {
      title: '所属区划',
      dataIndex: 'regCity',
    }, {
      title: '监管机构',
      dataIndex: 'orgName',
    }, {
      title: '联系人',
      dataIndex: 'contactName',
    }, {
      title: '联系电话',
      dataIndex: 'contactPhone',
    }, {
      title: '注册日期',
      dataIndex: 'gmtCreate',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => (
        <span>
          <Link style={{ marginRight: '10px' }} to='/organic/detail'>查看详情</Link>
        </span>
      )
    }]
  }

  componentDidMount() {
    this.props.init({
      orgType: '0202'
    })
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  //切换页码
  paginationChange = (pageNo) => {
    this.props.init({
      pageNo
    })
  }

  //切换每页条数
  onShowSizeChange = (pageNo, pageSize) => {
    this.props.init({
      pageSize,
      pageNo
    })
  }

  //总条数
  showTotal = (total) => {
    return `共有${total}条`
  }

  //详情
  handleView = (id) => {
    this.context.router.push((`/branchAudit/detail/${id}`))
  }

  //tab切换
  onTabChange = (orgType) => {
    this.props.init({
      orgType
    })
  }

  //搜索
  onSearch = (fullName) => {
    this.props.init({
      fullName
    })
  }

  render() {
    const { list, total } = this.props
    return (
      <div>
        <ZCYContainer>
          <ZCYPanel>
            <ZCYPanel.Header title="机构查询">
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <Row>
                <Col style={{ padding: '3px 0' }} span={2}>
                  <span >机构名称:</span>
                </Col>
                <Col span={7}>
                  <ZCYSearch
                    placeholder="请输入机构名称"
                    onSearch={this.onSearch}
                    style={{ marginBottom: '20px', marginLeft: '-13px' }}
                  ></ZCYSearch>
                </Col>
              </Row>
              <ZCYTab style={{ marginBottom: '20px' }} onChange={this.onTabChange} tabBarExtraContent={(<a style={{ paddingRight: '10px' }} href="#">审核记录</a>)}>
                <ZCYTab.Pane tab="正式代理机构" key="0202"></ZCYTab.Pane>
                <ZCYTab.Pane tab="临时代理机构" key="0101"></ZCYTab.Pane>
              </ZCYTab>
              <Table
                columns={this.columns}
                dataSource={list}
                bordered
                pagination={{
                  total: total,
                  ...this.state.tableConfig
                }}
              />
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div >
    )
  }
}

export default agencyQuery;
