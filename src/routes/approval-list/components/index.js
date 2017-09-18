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
  Input
} from 'zcy-antd'
import { 
  ZCYContainer, 
  ZCYTab, 
  ZCYStatus, 
  ZCYStepTab, 
  ZCYPanel, 
  ZCYForm, 
  Validate,
  ZCYSearch,
  ZCYDatePicker
} from 'zcy-common'
import moment from 'moment';
import { Link } from 'react-router';

class ApprovalList extends Component {

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
            <Link className="zcy-mr" to={`/organic/audit/${text.id}/${text.bizId}/${text.state}`}>查看详情</Link>
            <a href="javascript:;" onClick={() => this.approval(text.id)}>
              { this.state.approvalState === 'FIRST_ORG' ? '初审' : '终审' }
            </a>
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
      approvalState: 'FIRST_ORG',
      approvalType: null,
      pageNo: 1,
      pageSize: 10,
      modalConfig: {
        title: "审批",
        onCancel: this.onCancel,
      },
      formItemLayout: {
        labelCol: { 
          span: 6
        },
        wrapperCol: { 
          span: 18
        },
      },
      onOk: null,
      disAgree: '',
      agree: ''
    }
  }

  static propTypes = {
    form: PropTypes.object.isRequired
  }

  componentDidMount() {
    this.getApprovalList({
      state: this.state.approvalState,
      approvalType: this.state.approvalType,
    })
  }

  approval = (id) => {
    let workFlowNode = this.state.approvalState
    let disAgree, agree;
    if (workFlowNode === 'FIRST_ORG') {
      disAgree = 'APPROVAL_FIRST_NUAGREE'
      agree = 'APPROVAL_FIRST_AGREE'
    } else if (workFlowNode === 'AGAIN_ORG') {
      disAgree = 'APPROVAL_FINAL_NUAGREE'
      agree = 'APPROVAL_FINAL_AGREE'
    }
    this.setState({
      modalVisible: true,
      disAgree,
      agree,
      onOk: () => this.dispose(id)
    })
  }

  onCancel = () => {
    this.setState({
      modalVisible: false,
    })
  }

  dispose = (id) => {
    let data = this.props.form.getFieldsValue();
    console.log(data)
    data.id = id
    this.setState({
      modalLoading: true
    })
    this.props.dispose({
      ...data
    }).then(() => {
      message.success('操作成功!');
      
      this.setState({
        modalVisible: false,
        modalLoading: false
      })
      this.getApprovalList({
        pageSize,
        state: this.state.approvalState,
        approvalType: this.state.approvalType,
      })
    })
  }

  getApprovalList = (params) => {
    this.setState({
      tableLoading: true
    })
    const { getApprovalList } = this.props
    getApprovalList({
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
    this.getApprovalList({
      pageNo,
      pageSize,
      state: this.state.approvalState,
      approvalType: this.state.approvalType,
    })
  }

  onShowSizeChange = (pageNo, pageSize) => {
    this.setState({
      pageSize
    })
    this.getApprovalList({
      pageNo,
      pageSize,
      state: this.state.approvalState,
      approvalType: this.state.approvalType,
    })
  }

  showTotal = (total) => {
    return `共有${total}条数据`
  }

  tabChange = (activeKey) => {
    let approvalState = activeKey;
    let approvalType;
    if (activeKey === 'agency_change' || activeKey === 'agency_logout') {
      approvalState = 'AGAIN_ORG';
      approvalType = activeKey;
    }
    this.setState({
      approvalState,
      approvalType
    })
    this.getApprovalList({
      state: approvalState,
      approvalType,
    })
  }

  onSearch = (fullName) => {
    const { approvalState, approvalType, pageSize } = this.state
    this.getApprovalList({
      fullName,
      pageSize,
      state: approvalState,
      approvalType,
    }).then(() => {
      this.setState({
        pageNo: 1
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    const { approvalList, total } = this.props
    const { tableConfig, pageNo, tableLoading, modalVisible, modalConfig, modalLoading, formItemLayout, onOk, agree, disAgree, approvalState, approvalType } = this.state;
    return (
      <div>
        <ZCYContainer>
          <ZCYPanel>
            <ZCYPanel.Header title="注册变更审核列表"></ZCYPanel.Header>
            <ZCYPanel.Body>
              <Row>
                <ZCYSearch
                placeholder="请输入关键字"
                onSearch={this.onSearch}
                style={{float: 'right', marginBottom: '20px'}}
                ></ZCYSearch>
              </Row>
              <ZCYTab tabBarExtraContent={(<a href="#">审核记录</a>)} onChange={this.tabChange}>
                <ZCYTab.Pane tab="待初核" key="FIRST_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="待复核" key="AGAIN_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="变更待复核" key="agency_change"></ZCYTab.Pane>
                <ZCYTab.Pane tab="注销待复核" key="agency_logout"></ZCYTab.Pane>
              </ZCYTab>
              <Table
                style={{marginTop: '20px'}}
                columns={this.columns} 
                pagination={{
                  total: total,
                  current: pageNo,
                  ...tableConfig
                }} 
                dataSource={approvalList}
                loading={tableLoading}
                bordered></Table>
                <Modal
                  visible={modalVisible}
                  {...modalConfig}
                  confirmLoading={modalLoading}
                  onOk={onOk}
                  >
                  <Form horizontal>
                    <Form.Item
                      {...formItemLayout}
                      label="审批结果"
                    >
                      <Radio.Group  {...getFieldProps('workFlowNode')}>
                        <Radio value={agree}>通过</Radio>
                        <Radio value={disAgree}>不通过</Radio>
                      </Radio.Group>
                    </Form.Item>
                    {
                      approvalState === 'AGAIN_ORG' && !approvalType && (
                        <Form.Item
                          {...formItemLayout}
                          label="书面材料上报时间"
                        >
                          <ZCYDatePicker {...getFieldProps('reportTime')}/>
                        </Form.Item>
                      )
                    }
                    <Form.Item
                      {...formItemLayout}
                      label="审批意见"
                    >
                      <Input type="textarea" {...getFieldProps('approvalRemark')}/>
                    </Form.Item>
                    
                  </Form>
                </Modal>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

export default Form.create()(ApprovalList)
