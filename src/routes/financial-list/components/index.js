import React, { Component, createStore } from 'react'
import { Table, Button, Form, message } from 'zcy-antd'
import { ZCYPanel, ZCYStatus, ZCYContainer, ZCYUtils } from 'zcy-common'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { AgencyModal, StepTab, AgencyStatus, AgencySubmit, getPower } from 'components-common'

class financialList extends Component {
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
      title: '财报年度',
      dataIndex: 'year',
      fixed: 'left'
    }, {
      title: '销售收入（万元）',
      dataIndex: 'salesMoney',
    }, {
      title: '资本金（万元）',
      dataIndex: 'capitalAmount',
    }, {
      title: '利润总额（万元）',
      dataIndex: 'totalProfit',
    }, {
      title: '上缴税金（万元）',
      dataIndex: 'incomeTax',
    }, {
      title: '资产合计（万元）',
      dataIndex: 'totalAssets',
    }, {
      title: '负载总额（万元）',
      dataIndex: 'totalLiabilitie',
    }, {
      title: '所有者权益（万元）',
      dataIndex: 'ownershipinterest',
    }, {
      title: '操作',
      dataIndex: 'operation',
      fixed: 'right',
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
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    this.props.init({
      orgId
    })
  }

  //详情
  handleView = (id) => {
    this.context.router.push((`/financial/detail/${id}`))
  }

  //编辑
  handleEdit = (id) => {
    this.context.router.push((`/financial/edit/${id}`))
  }

  //删除项目
  handleDelete = (record) => {
    this.setState({
      modalType: 'delete',
      modalVisible: true,
      onOk: () => {
        this.onDeleteOk(record.id)
      }
    })
  }

  //删除弹框确认
  onDeleteOk = (id) => {
    this.props.remove({ id }).then(() => {
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

  render() {
    const { list } = this.props
    const { isAudit } = this.state
    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
           <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit></AgencySubmit>
          </div>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <ZCYPanel>
            <AgencyModal
              visible={this.state.modalVisible}
              modalType={this.state.modalType}
              onOk={this.state.onOk}
              onCancel={() => { this.setState({ modalVisible: false }) }}
            ></AgencyModal>
            <ZCYPanel.SubHeader order="1" title="财报列表">
              {
                !isAudit && (
                  <Button><Link to="/financial/create">新增</Link></Button>
                )
              }
            </ZCYPanel.SubHeader>
            <Table
              columns={this.columns}
              dataSource={list}
              bordered
              pagination={false}
            />
          </ZCYPanel>
        </ZCYContainer>

      </div>

    )
  }
}


export default financialList;
