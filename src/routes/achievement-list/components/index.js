import React, { Component, createStore } from 'react'
import { Table, Button, Form, Select, message } from 'zcy-antd'
import PropTypes from 'prop-types'
import { ZCYPanel, ZCYStatus, ZCYContainer, ZCYUtils } from 'zcy-common'
import { Link } from 'react-router'
import { AgencyModal, StepTab, AgencyStatus, AgencySubmit, getPower } from 'components-common'

class achievementList extends Component {

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
      },
      modalVisible: false,
      modalType: '',
      onOk: null,
      isAudit: getPower.isAudit()
    }

    this.columns = [{
      title: '项目编号',
      dataIndex: 'projectCode',
      fixed: 'left'
    }, {
      title: '项目名称',
      dataIndex: 'projectName'
    }, {
      title: '采购单位',
      dataIndex: 'companyName'
    }, {
      title: '采购方式',
      dataIndex: 'purchaseWayName',
    }, {
      title: '中标成交供应商',
      dataIndex: 'bidCompany',
    }, {
      title: '专职人员',
      dataIndex: 'handleName',
    }, {
      title: '项目时间',
      dataIndex: 'gmtCreate',
    }, {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
      width: 180,
      render: (text, record) => (
        <span>
          <a
            href="javascript:;"
            style={{ marginRight: '10px' }}
            onClick={() => this.handleView(record.id)}
          >
            查看详情
          </a>
          <a
            href="javascript:;"
            style={{ marginRight: '10px' }}
            onClick={() => this.handleEdit(record.id)}
          >
            编辑
          </a>
          <a
            href="javascript:;"
            onClick={() => this.handleDelete(record)}
            style={{ marginRight: '10px' }}>
            删除
          </a>
        </span>
      )
    }]
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  componentDidMount() {
    this.init()
  }

  init = (params) => {
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    this.props.init({
      ...params,
      orgId
    })
  }

  //删除项目
  handleDelete = (record) => {
    this.setState({
      modalType: 'delete',
      modalVisible: true,
      onOk: () => {
        this.onDeleteOk(record.id, record.orgId)
      }
    })
  }

  //删除弹框确认
  onDeleteOk = (id, orgId) => {
    this.props.remove({
      id,
      orgId
    }).then(() => {
      this.setState({
        modalVisible: false
      })
      message.success('删除成功')
    }, () => {
      this.setState({
        modalVisible: false
      })
      message.error('删除失败')
    })
  }

  //切换页码
  paginationChange = (pageNo) => {
    this.init({
      pageNo
    })
  }
  
  //切换每页条数
  onShowSizeChange = (pageNo, pageSize) => {
    this.init({
      pageSize,
      pageNo
    })
  }

  //总条数
  showTotal = (total) => {
    return `共有${total}条`
  }

  handleChange = (value) => {
    this.props.switchPerformanceType(value)
    if (value === 'allAchieve') {
      this.init()
    } else if (value === 'perform_system_in' || value === 'perform_entry_in') {
      this.init({
        performanceType: value
      })
    }
  }

  //编辑
  handleEdit = (id) => {
    this.context.router.push((`/achievement/edit/${id}`))
  }
  
  //详情
  handleView = (id) => {
    this.context.router.push((`/achievement/detail/${id}`))
  }

  withdraw = () => {
    this.props.withdraw()
  }

  render() {
    const { list, total, performanceType } = this.props
    const { isAudit } = this.state;
    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit></AgencySubmit>
          </div>
          <Button onClick={this.withdraw}>撤销</Button>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab> </StepTab>
          <ZCYPanel>
            <ZCYPanel.Header title="代理业绩"></ZCYPanel.Header>
            <ZCYPanel.Body>
              <AgencyModal
                visible={this.state.modalVisible}
                modalType={this.state.modalType}
                onOk={this.state.onOk}
                onCancel={() => { this.setState({ modalVisible: false }) }}
              ></AgencyModal>
              <Select onChange={this.handleChange} defaultValue="allAchieve" style={{ width: '170px', marginTop: '15px', marginBottom: '10px' }}>
                <Select.Option value="allAchieve">全部业绩</Select.Option>
                <Select.Option value="perform_system_in">系统业绩</Select.Option>
                <Select.Option value="perform_entry_in">录入业绩</Select.Option>
              </Select>
              {
                !isAudit && (
                  <Button type="primary" className="clearFix" style={{ float: 'right', marginTop: '15px' }}>
                    <Link to={`/achievement/create/${performanceType}`}>新增</Link>
                  </Button>
                )
              } 
              <Table
                columns={this.columns}
                dataSource={list}
                bordered
                pagination={
                  {
                    total: total,
                    ...this.state.tableConfig
                  }
                }
                scroll={{ x: 1300 }}
              />
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}


export default achievementList;
