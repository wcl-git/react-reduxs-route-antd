import React, { Component, createStore } from 'react'
import { Table, Button, Form, Row, message, Dropdown, Menu, Icon, Modal, Input } from 'zcy-antd'
import { ZCYPanel, ZCYStatus, ZCYContainer, ZCYValidate, Address, ZCYUtils } from 'zcy-common'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { AgencyModal, StepTab, getPower } from 'components-common'

class branchList extends Component {

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
      accountModalConfig: {
        title: '开通分支机构账号',
        onCancel: this.onCancel,
        onOk: this.handleSubmit
      },
      modalVisible: false,
      modalType: '',
      onOk: null,
      accountModalVisible: false,
      formItemLayout: {
        labelCol: {
          span: 4
        },
        wrapperCol: {
          span: 12
        },
      },
      subordinationName: '',
      id: '',
      fullName: '',
      isAudit: getPower.isAudit()
    }

    this.columns = [{
      title: '分支机构名称',
      dataIndex: 'fullName',
      fixed: 'left',
    }, {
      title: '隶属关系',
      dataIndex: 'subordinationName',
    }, {
      title: '负责人',
      dataIndex: 'contactName',
    }, {
      title: '联系电话',
      dataIndex: 'contactPhone',
    }, {
      title: '工商所在地',
      dataIndex: 'regAddress',
    }, {
      title: '操作',
      dataIndex: 'operation',
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
          {(record.organicState === 'FORMAL' && !record.organicInfo) ?
            (< Dropdown overlay={
              (<Menu>
                <Menu.Item>
                  <a
                    href="javascript:;"
                    onClick={() => this.handleDelete(record)}
                    style={{ marginRight: '10px' }}>
                    删除
              </a>
                </Menu.Item>
                <Menu.Item>
                  <a className="zcy-mr" href="javascript:;" onClick={() => this.openAccount(record)}>开通账号</a>
                </Menu.Item>
              </Menu>)
            }>
              <a className="zcy-mr" href="javascript:;">更多 <Icon type="down" /></a>
            </Dropdown>)
            :
            <a
              href="javascript:;"
              onClick={() => this.handleDelete(record)}
              style={{ marginRight: '10px' }}>
              删除
            </a>
          }
        </span >
      )
    }]
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

  static contextTypes = {
    router: PropTypes.shape
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

  //编辑
  handleEdit = (id) => {
    this.context.router.push((`/branch/edit/${id}`))
  }

  //详情
  handleView = (id) => {
    this.context.router.push((`/branch/detail/${id}`))
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
  onDeleteOk = (id, orgId) => {
    this.props.remove({ id }).then(() => {
      message.success('删除成功')
      this.setState({
        modalVisible: false
      })
    }, () => {
      message.error('删除失败')
      this.setState({
        modalVisible: false
      })

    })
  }

  //开通账号
  openAccount = (record) => {
    this.setState({
      fullName: record.fullName,//机构名称
      id: record.id,
      subordinationName: record.subordinationName,//关系
      accountModalVisible: true
    })
  }

  //弹框取消
  onCancel = () => {
    this.props.initForm()
    this.setState({
      accountModalVisible: false
    })
  }

  //弹框内容提交
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.warning('请完善数据')
        return
      }
      values.fullName = this.state.fullName
      values.id = this.state.id
      values.region = values.region[values.region.length - 1]

      this.props.submit(values).then(() => {
        this.props.initForm()
        this.setState({
          accountModalVisible: false
        })
        message.success('开通账号成功')
      }, () => {
        message.error('开通账号失败')
      })
    })
  }

  render() {
    const { list, total,categoryName } = this.props
    const { getFieldProps } = this.props.form
    const { isAudit } = this.state;
    const region = getFieldProps('region', {
      rules: [...ZCYValidate.required]
    })
    const userName = getFieldProps('userName', {
      rules: [...ZCYValidate.required]
    })
    const password = getFieldProps('password', {
      rules: [...ZCYValidate.required]
    })

    const { accountModalConfig, accountModalVisible, modalType, onOk, modalVisible, subordination, fullName, formItemLayout } = this.state


    return (
      <div>
        <ZCYContainer>
          <ZCYPanel>
            {
              categoryName && categoryName.startsWith('06') && (
                <StepTab></StepTab>
              )
            }
            <ZCYPanel.Header title="分支机构列表">
              {
                !isAudit && (
                  <Button><Link to='/branch/create'>新增</Link></Button>
                )
              }
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <AgencyModal
                visible={modalVisible}
                modalType={modalType}
                onOk={onOk}
                onCancel={() => { this.setState({ modalVisible: false }) }}
              ></AgencyModal>
              <Modal
                visible={accountModalVisible}
                {...accountModalConfig}
                width={700}
              >
                <Form horizontal>
                  <Form.Item
                    {...formItemLayout}

                    label="从属关系"
                  >
                    <span>{this.state.subordinationName}</span>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}

                    label="分支机构名称"
                  >
                    <span> {fullName}</span>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    type="district"
                    label="所属区划"
                  >
                    <Address
                      type="district"
                      {...region}
                      ref="address"
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="账号"
                  >
                    <Input rows={4} {...userName} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="密码"
                  >
                    <Input rows={4} {...password} />
                  </Form.Item>
                </Form>
              </Modal>
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

export default Form.create({
  mapPropsToFields(props) {
    return props.data
  }
})(branchList)

