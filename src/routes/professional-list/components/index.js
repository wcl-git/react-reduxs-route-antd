import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Breadcrumb,
  Button,
  Table,
  Dropdown,
  Menu,
  Icon,
  Row,
  Modal,
  Form,
  Input,
  message
} from 'zcy-antd';
import {
  ZCYContainer,
  ZCYStatus,
  ZCYPanel,
  ZCYDatePicker,
  ZCYUtils
} from 'zcy-common';

import { Link } from 'react-router';
import { StepTab, AgencyStatus, AgencySubmit, getPower } from 'components-common'
import './index.less';

class AgencyProfessionalList extends Component {

  constructor(props) {
    super(props)
    this.columns = [{
      title: '姓名',
      width: '100px',
      dataIndex: 'name'
    }, {
      title: '性别',
      dataIndex: 'sex',
      render: (text) => text === 1 ? '男' : '女'
    }, {
      title: '所属部门',
      dataIndex: 'deptCode',
    }, {
      title: '职务',
      dataIndex: 'post',
    }, {
      title: '职称',
      dataIndex: 'professionTitle',
    }, {
      title: '联系电话',
      dataIndex: 'telephone',
    }, {
      title: '入职时间',
      dataIndex: 'entryDate',
      render: (text) => text && moment(text).format('YYYY-MM-DD')
    }, {
      title: '操作',
      width: 180,
      fixed: 'right',
      render: (obj, record, index) => {
        return (
          <div>
            <Link className="zcy-mr" to={`/professional/detail/${obj.userId}`}>查看详情</Link>
            {
              !this.state.isAudit && (
                <div>
                  <Link className="zcy-mr" to={`/achievement/detail/${obj.id}`}>查看业绩</Link>
                  <Dropdown overlay={
                    (<Menu>
                      <Menu.Item>
                        <Link to={`/professional/edit/${obj.userId}`}>编辑</Link>
                      </Menu.Item>
                      <Menu.Item>
                        <a className="zcy-mr" href="javascript:;" onClick={() => this.showDismissModal(obj.userId)}>解聘</a>
                      </Menu.Item>
                    </Menu>)
                  }>
                    <a className="zcy-mr" href="javascript:;">更多 <Icon type="down" /></a>
                  </Dropdown>
                </div>
              )
            
            }
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
      dismissModalConfig: {
        title: "解聘",
        onCancel: this.onCancel,
        okText: "解聘",
      },
      onOk: null,
      formItemLayout: {
        labelCol: { 
          span: 4 
        },
        wrapperCol: { 
          span: 20 
        },
      },
      tableLoading: true,
      dismissModalVisible: false,
      pageNo: 1,
      pageSize: 10,
      dismissLoading: false,
      isAudit: getPower.isAudit()
    }
  }

  

  static propTypes = {
    form: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  componentDidMount() {
    this.getProfessionalList();
  }

  paginationChange = (pageNo, pageSize) => {
    this.setState({
      pageNo,
    })
    this.getProfessionalList({
      pageNo,
      pageSize
    })
  }

  onShowSizeChange = (pageNo, pageSize) => {
    this.setState({
      pageSize,
    })
    this.getProfessionalList({
      pageNo,
      pageSize
    })
  }

  getProfessionalList = (options) => {
    const { getProfessionalList } = this.props;
    this.setState({
      tableLoading: true
    })
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    options = {
      ...options,
      orgId
    }
    return getProfessionalList(options).then(() => {
      this.setState({
        tableLoading: false
      })
    })
  }

  showTotal = (total) => {
    return `共有${total}条数据`
  }

  turnToCreate = () => {
    let router = this.context.router;
    router.push('/professional/create');
  }

  showDismissModal = (userId) => {
    this.setState({
      dismissModalVisible: true,
      onOk: () => this.handleDismissSubmit(userId)
    })
  }

  handleDismissSubmit = (userId) => {
    let data = this.props.form.getFieldsValue();
    data.userId = userId;
    data.pageSize = this.state.pageSize;
    this.setState({
      dismissLoading: true,
    })
    this.props.dismissProfessional(data).then((res) => {
      message.success('解聘成功');
      this.setState({
        pageNo: 1,
        dismissModalVisible: false,
        dismissLoading: false,
      })
      return this.getProfessionalList({
        pageSize: this.state.pageSize
      })
    });
  }

  onCancel = () => {
    this.setState({
      dismissModalVisible: false
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    const { professionalList, total } = this.props
    const { isAudit, dismissModalVisible, dismissModalConfig, formItemLayout, tableConfig, tableLoading, pageNo, onOk, dismissLoading } = this.state;
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
            <ZCYPanel.Header title="专职人员"></ZCYPanel.Header>
            <ZCYPanel.Body>
              {
                !isAudit && (
                  <Row>
                    <Button type="ghost" className="professional-list-create-btn" onClick={this.turnToCreate}>新增</Button>
                  </Row>
                )
              }
              
              <Table
                columns={this.columns}
                pagination={{
                  total: total,
                  current: pageNo,
                  ...tableConfig
                }}
                dataSource={professionalList}
                loading={tableLoading}
                bordered
                ></Table>
                <Modal
                  visible={dismissModalVisible}
                  {...dismissModalConfig}
                  confirmLoading={dismissLoading}
                  onOk={onOk}
                  >
                  <Form horizontal>
                    <Form.Item
                      {...formItemLayout}
                      label="解聘日期"
                    >
                      <ZCYDatePicker {...getFieldProps('applyDate')} />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout}
                      label="解聘说明"
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

export default Form.create()(AgencyProfessionalList);
