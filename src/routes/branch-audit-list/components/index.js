import React, { Component, createStore } from 'react'
import { Table, Button, Form, Row, Col, Modal, Input, Radio, message } from 'zcy-antd'
import { ZCYPanel, ZCYStatus, ZCYContainer, ZCYTab, ZCYSearch, ZCYValidate } from 'zcy-common'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import moment from 'moment'

class branchAuditList extends Component {

  constructor(props) {
    super(props)

    this.columns = [{
      title: '单号',
      dataIndex: 'approvalCode',
      fixed: 'left',
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
      dataIndex: 'operation',
      render: (text, record) => (
        <span>
          <Link style={{ marginRight: '10px' }} to='/organic/detail'>查看详情</Link>
          <a className="zcy-mr" href="javascript:;" onClick={() => this.approval(record)}>
            审核
          </a>
        </span>
      )
    }]
    //分页state
    this.state = {
      tableConfig: {
        onChange: this.paginationChange,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        showQuickJumper: true,
        showTotal: this.showTotal
      },
      modalConfig: {
        title: '审核',
        onCancel: this.onCancel,
        onOk: this.handleSubmit
      },
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 20
        },
      },
      modalVisible: false,
      id: null,
      state: 'agency_audit',
      approvalType: ''
    }
  }

  componentDidMount() {
    this.props.init({
      state: 'APPROVAL_ORG'
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

  //单号搜索
  approvalCodeSearch = (approvalCode) => {
    this.props.init({
      approvalCode
    })
  }

  //单号搜索
  fullNameSearch = (fullName) => {
    this.props.init({
      fullName
    })
  }

  //tab切换
  onTabChange = (state) => {
    switch (state) {
      case 'agency_audit':
        this.props.init({
          state: 'APPROVAL_ORG',
        })
        this.setState({
          state: 'agency_audit',
          approvalType: '',
        })
        break
      case 'agency_change':
        this.props.init({
          state: 'APPROVAL_ORG',
          approvalType: 'agency_branch_change',
        })
        this.setState({
          state: 'agency_change',
          approvalType: 'agency_branch_change',
        })
        break
      case 'agency_logout':
        this.props.init({
          state: 'APPROVAL_ORG',
          approvalType: 'agency_branch_change',
        })
        this.setState({
          state: 'agency_logout',
          approvalType: 'agency_branch_change',
        })
        break
      default:
        break
    }
  }

  approval = (record) => {
    this.setState({
      modalVisible: true,
      id: record.id
    })
  }

  //审批操作
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.warning('请完善数据')
        return
      }
      values.id = this.state.id
      values.state = this.state.state
      values.approvalType = this.state.approvalType

      this.props.audit(values).then(() => {
        this.props.initForm()
        this.setState({
          modalVisible: false
        })
        message.success('审批成功')
      }, () => {
        message.error('审批失败')
      })
    })
  }

  //弹框取消
  onCancel = () => {
    this.props.initForm()
    this.setState({
      modalVisible: false
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    const approvalRemark = getFieldProps('approvalRemark', {
      rules: []
    })
    const workFlowNode = getFieldProps('workFlowNode', {
      rules: [...ZCYValidate.required]
    })
    const { list, total } = this.props
    const {
      modalVisible,
      modalConfig,
      formItemLayout,
      agree,
      disAgree,
      tableConfig } = this.state
    return (
      <div>
        <ZCYContainer>
          <ZCYPanel>
            <ZCYPanel.Header title="机构审核"></ZCYPanel.Header>
            <ZCYPanel.Body>
              <Row>
                <Col style={{ padding: '3px 0' }} span={1}>
                  <span >单号:</span>
                </Col>
                <Col span={7}>
                  <ZCYSearch
                    placeholder="请输入单号"
                    onSearch={this.approvalCodeSearch}
                    style={{ marginBottom: '20px' }}
                  ></ZCYSearch>
                </Col>
                <Col span={2} style={{ padding: '4px 0 0 26px' }}>
                  <span >关键字:</span>
                </Col>
                <Col span={7}>
                  <ZCYSearch
                    placeholder="请输入关键字"
                    onSearch={this.fullNameSearch}
                    style={{ marginBottom: '20px' }}
                  ></ZCYSearch>
                </Col>
              </Row>
              <ZCYTab style={{ marginBottom: '20px' }} onChange={this.onTabChange} tabBarExtraContent={(<a style={{ paddingRight: '10px' }} href="#">审核记录</a>)}>
                <ZCYTab.Pane tab="待审核" key="agency_audit"></ZCYTab.Pane>
                <ZCYTab.Pane tab="变更待审核" key="agency_change"></ZCYTab.Pane>
                <ZCYTab.Pane tab="注销待审核" key="agency_logout"></ZCYTab.Pane>
              </ZCYTab>
              <Table
                columns={this.columns}
                dataSource={list}
                bordered
                pagination={{
                  total: total,
                  ...tableConfig
                }}
              />

              <Modal
                visible={modalVisible}
                {...modalConfig}
              >
                <Form horizontal>
                  <Form.Item
                    {...formItemLayout}
                    label="审批结果"
                  >
                    <Radio.Group  {...workFlowNode }>
                      <Radio value="APPROVAL_AGREE">通过</Radio>
                      <Radio value="APPROVAL_NUAGREE">不通过</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="审批意见"
                  >
                    <Input type="textarea" rows={4} {...approvalRemark} />
                  </Form.Item>
                </Form>
              </Modal>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div >
    )
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return props.data;
  }
})(branchAuditList)
