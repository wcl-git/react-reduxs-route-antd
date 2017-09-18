import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { 
  Breadcrumb, 
  Button, 
  Form, 
  Table, 
  Dropdown, 
  Menu, 
  Icon,
  Row,
  Modal,
  Radio,
  message
} from 'zcy-antd'
import { 
  ZCYContainer, 
  ZCYTab, 
  ZCYStatus, 
  ZCYStepTab, 
  ZCYPanel, 
  ZCYForm, 
  Validate,
  ZCYSearch
} from 'zcy-common'
import moment from 'moment';
import { Link } from 'react-router';

class ApprovalPublicList extends Component {

  constructor(props) {
    super(props)
    this.columns = [{
      title: '单号',
      dataIndex: 'approvalCode',
    }, {
      title: '机构名称',
      dataIndex: 'fullName',
    }, {
      title: '机构地址',
      dataIndex: 'districtFullName',
    }, {
      title: '联系人',
      dataIndex: 'contactName',
    }, {
      title: '联系电话',
      dataIndex: 'contactPhone',
    }, {
      title: '申请日期',
      dataIndex: 'gmtCreate',
      render: (text) => text && moment(text).format('YYYY-MM-DD')
    }, {
      title: '操作',
      width: 100,
      render: (text, record, index) => {
        return (
          <div>
            { this.state.approvalState === 'NOTICE_WAIT_ORG' && (
              <div>
                <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(text.id, 'APPROVAL_PUBLIC_AGREE', '您确定同意公示吗？')}>同意公示</a>
                <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(text.id, 'APPROVAL_BACK')}>退回</a>
              </div>
            )}
            { this.state.approvalState === 'NOTICE_ING_ORG' && (
              <div>
                <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(text.id, 'APPROVAL_END_PUBLIC_AGREE', '您确定结束公示吗？')}>结束公示</a>
                <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(text.id, 'APPROVAL_RETURN_NUAGREE', '您确定收回吗？')}>收回</a>
              </div>
            )}
            { this.state.approvalState === 'NOTICE_AGAIN_PUBLIC_ORG' && (
              <div>
                <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(text.id, 'APPROVAL_END_PUBLIC_AGREE', '您确定重新公示吗？')}>重新公示</a>
                <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(text.id, 'APPROVAL_TEMP_ORG_AGREE', '您确定入库吗？')}>入库</a>
              </div>
            )}
            { this.state.approvalState === 'TEMP_ORG' && (
              <div>
                <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(text.id, 'APPROVAL_TEMP_ORG_AGREE', '您确定入库吗？')}>入库</a>
                <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(text.id, 'APPROVAL_BACK_NUAGREE', '您确定退回吗？')}>退回</a>
              </div>
            )}
          </div>
        )
      }
    }];

    this.state = {
      tableConfig: {
        onChange: this.paginationChange,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        showQuickJumper: true,
        showTotal: this.showTotal
      },
      tableLoading: true,
      approvalState: 'NOTICE_WAIT_ORG',
      pageNo: 1,
      pageSize: 10,
      modalVisible: false,
      modalLoading: false,
      modalConfig: {
        title: "审批",
        onCancel: this.onCancel,
      },
      modalText: '',
      modalRadioValue: ''
    }
  }

  approval = (id, workFlowNode, text) => {
    let data = {};
    data.id = id;
    data.workFlowNode = workFlowNode
    this.setState({
      modalVisible: true,
      modalText: workFlowNode !== 'APPROVAL_BACK' ? text : (
        <Form.Item label='请求退回给' style={{marginBottom: 0}}>
          <Radio.Group defaultValue='APPROVAL_BACK_NUAGREE' onChange={this.onRadioChange}>
            <Radio key="WAIT_SUBMMIT_FIRST" value='WAIT_SUBMMIT_FIRST'>代理机构</Radio>
            <Radio key="APPROVAL_BACK_NUAGREE" value='APPROVAL_BACK_NUAGREE'>监管机构</Radio>
          </Radio.Group>
        </Form.Item>
      ),
      onOk: () => this.dispose(data)
    })
  }

  onRadioChange = (e) => {
    this.setState({
      modalRadioValue: e.target.value
    })
  }

  dispose = (data) => {
    this.setState({
      modalLoading: true
    })
    if (data.workFlowNode === 'APPROVAL_BACK') {
      data.workFlowNode = this.state.modalRadioValue
    }
    this.props.dispose({
      ...data
    }).then(() => {
      message.success('操作成功!');
      this.setState({
        modalVisible: false,
        modalLoading: false
      })
      this.getApprovalPublicList({
        state: this.state.approvalState,
        pageSize: this.state.pageSize
      })
    })
  }

  onCancel = () => {
    this.setState({
      modalVisible: false
    })
  }

  componentDidMount() {
    this.getApprovalPublicList({
      state: this.state.approvalState,
    })
  }

  getApprovalPublicList = (params) => {
    this.setState({
      tableLoading: true
    })
    const { getApprovalPublicList } = this.props
    getApprovalPublicList({
      ...params
    }).then(() => {
      this.setState({
        tableLoading: false
      })
    })
  }

  paginationChange = (pageNo, pageSize) => {
    this.setState({
      pageNo
    })
    this.getApprovalPublicList({
      pageNo,
      pageSize,
      state: this.state.approvalState,
    })
  }

  onShowSizeChange = (pageNo, pageSize) => {
    this.setState({
      pageSize
    })
    this.getApprovalPublicList({
      pageNo,
      pageSize,
      state: this.state.approvalState,
    })
  }

  showTotal = (total) => {
    return `共有${total}条数据`
  }

  tabChange = (activeKey) => {
    let approvalState = activeKey;
    this.setState({
      approvalState
    })
    this.getApprovalPublicList({
      state: approvalState,
    })
  }

  onSearch = (fullName) => {
    const { approvalState, pageSize } = this.state
    this.getApprovalList({
      fullName,
      pageSize,
      state: approvalState,
    }).then(() => {
      this.setState({
        pageNo: 1
      })
    })
  }

  render() {
    const { approvalPublicList, total } = this.props
    const { tableConfig, pageNo, modalVisible, modalConfig, modalText, tableLoading, modalLoading, onOk } = this.state;
    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <Button type="primary">提交审核</Button>
          </div>
          <Breadcrumb >
            <Breadcrumb.Item><Link to="/table">我的面包屑1</Link></Breadcrumb.Item>
            <Breadcrumb.Item><span>我的面包屑2</span></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <ZCYPanel>
            <ZCYPanel.Header title="公示入库审核列表"></ZCYPanel.Header>
            <ZCYPanel.Body>
              <Row>
                <ZCYSearch
                placeholder="请输入关键字"
                onSearch={this.onSearch}
                style={{float: 'right', marginBottom: '20px'}}
                ></ZCYSearch>
              </Row>
              <ZCYTab tabBarExtraContent={(<a href="#">审核记录</a>)} onChange={this.tabChange}>
                <ZCYTab.Pane tab="待公示" key="NOTICE_WAIT_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="公示中" key="NOTICE_ING_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="公示未通过" key="NOTICE_AGAIN_PUBLIC_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="待入库" key="TEMP_ORG"></ZCYTab.Pane>
              </ZCYTab>
              <Table
                style={{marginTop: '20px'}}
                columns={this.columns} 
                pagination={{
                  total: total,
                  current: pageNo,
                  ...tableConfig
                }} 
                loading={tableLoading}
                dataSource={approvalPublicList} 
                bordered></Table>
              <Modal
                visible={modalVisible}
                {...modalConfig}
                confirmLoading={modalLoading}
                onOk={onOk}
                >
                {modalText}
              </Modal>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

export default ApprovalPublicList
