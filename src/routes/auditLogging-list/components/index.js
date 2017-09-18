import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Table, message } from 'zcy-antd'
import { ZCYContainer, ZCYPanel } from 'zcy-common'
import moment from 'moment'
import { Link } from 'react-router'
import AgencyModal from 'components-common/agency-modal'

export default class AuditLoggingList extends Component {
  static contextTypes = {
    router: PropTypes.shape
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '单号',
        dataIndex: 'approvalCode',
        width: 264
      },
      {
        title: '提交审核日期',
        dataIndex: 'gmtCreate',
        width: 240,
        render: text => text && moment(text).format('YYYY-MM-DD')
      },
      {
        title: '审核状态',
        dataIndex: 'stateName',
        width: 240
        //字段映射
      },
      {
        title: '入库日期',
        dataIndex: 'gmtModified',
        width: 240,
        render: (text, record, index) => {
          if (
            record.state === 'FORMAL_ORG' ||
            record.state === 'FORMAL_CHANGE_ORG'
          ) {
            text && moment(text).format('YYYY-MM-DD')
          } else {
            return ''
          }
        }
      },
      {
        title: '操作',
        dataIndex: 'operate',
        width: 304,
        render: (text, record, index) => {
          return (
            <div>
              <Link className="zcy-mr" to={`/auditLogging/detail/${record.id}`}>
                查看详情
              </Link>
              {/* <Link className="zcy-mr" to={`/auditLogging/edit/${record.id}`}>
                编辑
              </Link> */}
              {/* <a
                className="zcy-mr"
                href="javascript:;"
                onClick={() => this.showModal(record.id)}
              >
                撤回
              </a> */}
            </div>
          )
        }
      }
    ]
    //分页state
    this.state = {
      ModalVisible: false,
      modalType: '',
      recallId: null,
      tableConfig: {
        onChange: this.paginationChange,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        showQuickJumper: true,
        showTotal: this.showTotal
      }
    }
  }

  componentDidMount() {
    this.props.loadApprovalList()
  }

  //切换页码
  paginationChange = (pageNo, pageSize) => {
    this.props.loadApprovalList({
      pageNo,
      pageSize
    })
  }
  //切换每页条数
  onShowSizeChange = (pageNo, pageSize) => {
    this.props.loadApprovalList({
      pageNo,
      pageSize
    })
  }
  //总条数
  showTotal = total => {
    return `共有${total}条`
  }

  showModal = (id, type = 'recall') => {
    this.setState({
      modalVisible: true,
      modalType: type,
      recallId: id
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  handleRecall = () => {
    const { recallId } = this.state
    this.props.recallItem({ approvalId: recallId }).then(
      () => {
        message.success('撤回成功')
        this.setState({
          modalVisible: false
        })
      },
      e => {
        console.log('axios ', e)
        message.error('撤回失败')
        this.setState({
          modalVisible: false
        })
      }
    )
  }

  render() {
    const columns = this.columns
    const { tableList, total } = this.props

    return (
      <div className="aduit-logging">
        <ZCYContainer>
          <ZCYPanel>
            <ZCYPanel.Header title="审核记录" />
            <ZCYPanel.Body>
              <ZCYPanel.SubHeader title="审核记录表" />
              <div className="aduit-logging-table">
                <Table
                  columns={columns}
                  dataSource={tableList}
                  bordered
                  pagination={{
                    total: total,
                    ...this.state.tableConfig
                  }}
                />
                <AgencyModal
                  visible={this.state.modalVisible}
                  modalType={this.state.modalType}
                  onOk={this.handleRecall}
                  onCancel={this.hideModal}
                />
              </div>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}
