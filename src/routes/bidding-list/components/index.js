import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Select, Table, message } from 'zcy-antd'
import { ZCYContainer, ZCYStatus, ZCYPanel, ZCYUtils } from 'zcy-common'
import { Link } from 'react-router'
import {
  AgencyModal,
  StepTab,
  AgencyStatus,
  AgencySubmit,
  getPower
} from 'components-common'

export default class AgencyBiddingSiteList extends Component {
  static contextTypes = {
    router: PropTypes.shape
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '场地编号',
        dataIndex: 'siteCode',
        fixed: 'left'
      },
      {
        title: '场地名称',
        dataIndex: 'siteName'
      },
      {
        title: '场地类型',
        dataIndex: 'siteType',
        render: text => {
          switch (text) {
            case 'site_type_open':
              return '开标室'
            case 'site_type_inq':
              return '询标室'
            case 'site_type_review':
              return '评审室'
            case 'site_type_other':
              return '其他'
          }
        }
      },
      {
        title: '场地地址',
        dataIndex: 'siteAddress'
      },
      {
        title: '面积(平米)',
        dataIndex: 'siteProportion'
      },
      {
        title: '容量',
        dataIndex: 'maxCapacity'
      },
      {
        title: '是否开放',
        dataIndex: 'isOpen',
        render: text => (text == 1 ? '是' : '否')
      },
      {
        title: '操作',
        dataIndex: 'operate',
        // fixed: 'right',
        render: (text, record, index) => {
          return (
            <div>
              <Link className="zcy-mr" to={`/bidding/detail/${record.id}`}>
                查看详情
              </Link>
              <Link className="zcy-mr" to={`/bidding/edit/${record.id}`}>
                编辑
              </Link>
              <a
                className="zcy-mr"
                href="javascript:;"
                onClick={() => this.showDeleteModal(record.id)}
              >
                删除
              </a>
            </div>
          )
        }
      }
    ]
    //分页state
    this.state = {
      deleteModalVisible: false,
      deleteId: null,
      tableConfig: {
        onChange: this.paginationChange,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        showQuickJumper: true,
        showTotal: this.showTotal
      },
      isAudit: getPower.isAudit()
    }
  }

  componentDidMount() {
    this.loadPlace({})
  }

  loadPlace = (params) => {
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    this.props.loadPlace({
      ...params,
      orgId
    })
  }

  //切换页码
  paginationChange = (pageNo, pageSize) => {
    this.loadPlace({
      pageNo,
      pageSize
    })
  }
  //切换每页条数
  onShowSizeChange = (pageNo, pageSize) => {
    this.loadPlace({
      pageNo,
      pageSize
    })
  }
  //总条数
  showTotal = total => {
    return `共有${total}条`
  }

  showDeleteModal = id => {
    this.setState({
      deleteModalVisible: true,
      deleteId: id
    })
  }

  hideDeleteModal = () => {
    this.setState({
      deleteModalVisible: false
    })
  }

  onOkDelete = () => {
    const { deleteId } = this.state
    this.props.removePlaceItem({ id: deleteId }).then(
      () => {
        message.success('删除成功')
        this.setState({
          deleteModalVisible: false
        })
      },
      e => {
        console.log('axios ', e)
        message.error('删除失败')
        this.setState({
          deleteModalVisible: false
        })
      }
    )
  }

  handleCreate = () => {
    const router = this.context.router
    router.push(`/bidding/create`)
  }

  handleChange = (value, option) => {
    // console.log(value)
    this.props.switchPlaceType(value)
    if (value === 'all') {
      this.loadPlace()
    } else {
      this.loadPlace({
        placeType: value
      })
    }
  }

  render() {
    const { tableList, total } = this.props
    const { isAudit } = this.state;
    return (
      <div>
        <div className="clearfix">
          <div className="zcy-mt" style={{ float: 'right' }}>
            <AgencySubmit />
          </div>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]" />
          <StepTab />
          <ZCYPanel>
            <ZCYPanel.Header title="场地信息" />
            <div className="place-select" style={{ margin: '20px 0' }}>
              <Select
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                defaultValue="all"
                style={{ width: 160 }}
              >
                <Select.Option value="all">全部场地</Select.Option>
              </Select>
              {
                !isAudit && (
                  <Button
                    type="primary"
                    onClick={this.handleCreate}
                    style={{ float: 'right' }}
                  >
                    新增
                  </Button>
                )
              }
            </div>
            <div className="place-table">
              <Table
                columns={this.columns}
                dataSource={tableList}
                bordered
                pagination={{
                  total: total,
                  ...this.state.tableConfig
                }}
              />
              <AgencyModal
                visible={this.state.deleteModalVisible}
                onOk={this.onOkDelete}
                onCancel={this.hideDeleteModal}
                modalType="delete"
              />
            </div>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}
