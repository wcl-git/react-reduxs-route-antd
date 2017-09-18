import React, { Component } from 'react'
import { ZCYPanel, ZCYForm, ZCYStatus, ZCYContainer, ZCYUtils } from 'zcy-common'
import { Button, Radio, Form, Input, Breadcrumb, Icon, Table, message } from 'zcy-antd'
import BaseForm from './base'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { AgencyModal, StepTab, AgencyStatus, AgencySubmit } from 'components-common'

const RadioGroup = Radio.Group
const PanelHeader = ZCYPanel.Header
const PanelBody = ZCYPanel.Body
const PanelSubHeader = ZCYPanel.SubHeader
const ZCYFormItem = ZCYForm.Item

class keyPersonnel extends Component {
  constructor(props) {
    super(props)
    this.columns = [{
      title: '姓名',
      dataIndex: 'name',
      fixed: 'left',
    }, {
      title: '类型',
      dataIndex: 'typeName',
    }, {
      title: '部门',
      dataIndex: 'deptName',
    }, {
      title: '职位',
      dataIndex: 'position',
    }, {
      title: '手机号码',
      dataIndex: 'phone',
    }, {
      title: '办公室电话',
      dataIndex: 'telephone',
    }, {
      title: '邮箱',
      dataIndex: 'email',
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
            onClick={() => this.handleDelete(record.id)}
            style={{ marginRight: '10px' }}>
            删除
          </a>
        </span>
      )
    }];
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
      personType: '',
      onOk: null
    }
    this.routerWillLeave = this.routerWillLeave.bind(this)
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  componentDidMount() {
    const { params } = this.props
    let orgId;
    if (ZCYUtils.getCookie('isAudit') === 'true') {
      orgId = ZCYUtils.getCookie('auditOrgId')
    }
    this.props.init({
      orgId
    })
    this.setAsyncRouteLeaveHook(this.context.router, this.props.route, this.routerWillLeave)
  }

  //路由切换
  routerWillLeave(nextLocation) {
    return new Promise((resolve, reject) => {
      if (!this.props.isUpdate) {
        // No changes -- leave
        resolve(true)
      } else {
        // Unsaved changes -- ask for confirmation
        this.setState({
          modalType: 'leave',
          modalVisible: true,
          onOk: () => resolve(true)
        })
      }
    })
  }

  setAsyncRouteLeaveHook = (router, route, hook) => {
    let withinHook = false
    let finalResult = undefined
    let finalResultSet = false
    router.setRouteLeaveHook(route, nextLocation => {
      withinHook = true
      if (!finalResultSet) {
        hook(nextLocation).then(result => {
          finalResult = result
          finalResultSet = true
          if (!withinHook && nextLocation) {
            // Re-schedule the navigation
            router.push(nextLocation)
          }
        })
      }

      let result = finalResultSet ? finalResult : false
      withinHook = false
      finalResult = undefined
      finalResultSet = false
      return result
    })
  }
  //分页切换页码
  paginationChange = (pageNo) => {
    this.initMinor({
      pageNo
    })
  }

  //分页切换每页条数
  onShowSizeChange = (pageNo, pageSize) => {
    this.initMinor({
      pageSize,
      pageNo
    })
  }

  initMinor = (params) => {
    let orgId;
    if (ZCYUtils.getCookie('isAudit') === 'true') {
      orgId = ZCYUtils.getCookie('auditOrgId')
    }
    this.props.initMinor({
      ...params,
      orgId
    })
  }

  //数据总条数
  showTotal = (total) => {
    return `共有${total}条`
  }

  //次要人员详情
  handleView = (id) => {
    this.context.router.push((`/minorPersonnel/detail/${id}`))
  }

  //编辑
  handleEdit = (id) => {
    this.context.router.push((`/minorPersonnel/edit/${id}`))
  }

  //保存主要人员
  handleSave = (modalType, personType) => {
    switch (personType) {
      case 'legal':
        this.dispatchState(modalType, personType)
        break
      case 'technique':
        this.dispatchState(modalType, personType)
        break
      case 'financial':
        this.dispatchState(modalType, personType)
        break
      case 'system':
        this.dispatchState(modalType, personType)
        break
      default:
        break
    }
  }

  //分发state
  dispatchState = (modalType, personType) => {
    this.refs[personType].validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.warning('请完善数据')
        return
      }
      values.attachmentMaps = {
        AGE_EMPLOYEE_CARDID: values.AGE_EMPLOYEE_CARDID,
        AGE_ORG_EMPLOYEE_PHOTO: values.AGE_ORG_EMPLOYEE_PHOTO
      }
      if (this.props[personType + 'Data'].id) {
        values.id = this.props[personType + 'Data'].id.value
      }
      switch (personType) {
        case 'financial':
          values.type = '3'
          break
        case 'legal':
          values.type = '1'
          break
        case 'system':
          values.type = '6'
          break
        case 'technique':
          values.type = '2'
          break
        default:
          break
      }
      this.setState({
        modalType,
        personType,
        modalVisible: true,
        onOk: () => { this.onSaveOk(personType, values) }
      })
    })
  }

  //删除次要人员
  handleDelete = (id) => {
    this.setState({
      modalType: 'delete',
      modalVisible: true,
      onOk: () => {
        this.onDeleteOk(id)
      }
    })
  }

  //取消编辑
  handleCancel = (type) => {
    this.setState({
      modalVisible: true,
      modalType: 'cancel',
      onOk: () => { this.onCancelOk(type) }
    })
  }

  //保存弹框确认
  onSaveOk = (personType, value) => {
    if (value.area) {
      value.prov = value.area[0]
      value.city = value.area[1]
      value.dist = value.area[2]
      //地址
      let text = this[personType + 'Comp'].label
      value.area.text = text
    }



    //数据是否完整
    value.isMeet = 'Y'

    this.props.save(value).then(() => {
      message.success('保存成功')
      //改变Redux内区划名
      this.props.setUpdateFlag(false)
      this.setState({
        modalVisible: false
      })
      this.props.toggleEdit(personType, false)
    }, () => {
      message.error('保存失败')
      this.setState({
        modalVisible: false
      })
    })
  }

  //取消弹框确认
  onCancelOk = (personType) => {
    this.props.toggleEdit(personType, false)
    this.setState({
      modalVisible: false
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

  //设置四个表单头部
  getSubHeader = (order, title, type, eidtEnable) => {
    return (
      <PanelSubHeader order={`${order}`} title={`${title}`}>
        {
          eidtEnable
            ?
            <div>
              <Button style={{ marginRight: '10px' }} onClick={() => { this.handleSave('save', `${type}`) }}>保存</Button>
              <Button onClick={() => { this.handleCancel(`${type}`) }}>取消</Button>
            </div>
            :
            <Button onClick={() => { this.props.toggleEdit(`${type}`, true) }}>编辑</Button>
        }
      </PanelSubHeader>
    )
  }

  jumpCreate = () => {
    this.context.router.push('/minorPersonnel/create')
  }

  render() {
    const {
      minorList, minorTotal,
      systemEditEnable, legalEditEnable,
      techniqueEditEnable, financialEditEnable
    } = this.props
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
            <PanelHeader title="主要人员">
              <span className="filling-explanation">
                <span><Icon type="info-circle-o" />填写说明</span>
              </span>
            </PanelHeader>
            <PanelBody>
              <AgencyModal
                visible={this.state.modalVisible}
                modalType={this.state.modalType}
                onOk={this.state.onOk}
                onCancel={() => { this.setState({ modalVisible: false }) }}
              ></AgencyModal>
              {this.getSubHeader(1, '负责人-机构（系统管理员）', 'system', systemEditEnable)}
              <BaseForm
                key='6'
                address={(el) => this.systemComp = el}
                ref='system'
                director='6'
                editEnable={this.props.systemEditEnable}
                formData={this.props.systemData}
                updateFormData={this.props.updateFormData}
                isUpdate={this.props.isUpdate}
                setUpdateFlag={this.props.setUpdateFlag}
              >
              </BaseForm>
              {this.getSubHeader(2, '负责人-法定代表人', 'legal', legalEditEnable)}
              <BaseForm
                key='1'
                address={(el) => this.legalComp = el}
                ref='legal'
                director='1'
                editEnable={this.props.legalEditEnable}
                isUpdate={this.props.isUpdate}
                setUpdateFlag={this.props.setUpdateFlag}
                formData={this.props.legalData}
                updateFormData={this.props.updateFormData}>
              </BaseForm>
              {this.getSubHeader(3, '负责人-技术负责人', 'technique', techniqueEditEnable)}
              <BaseForm
                key='2'
                address={(el) => this.techniqueComp = el}
                ref='technique'
                director='2'
                editEnable={this.props.techniqueEditEnable}
                isUpdate={this.props.isUpdate}
                setUpdateFlag={this.props.setUpdateFlag}
                updateFormData={this.props.updateFormData}
                formData={this.props.techniqueData}>
              </BaseForm>
              {this.getSubHeader(4, '负责人-财务管理员', 'financial', financialEditEnable)}
              <BaseForm
                key='3'
                address={(el) => this.financialComp = el}
                ref='financial'
                director='3'
                editEnable={this.props.financialEditEnable}
                isUpdate={this.props.isUpdate}
                setUpdateFlag={this.props.setUpdateFlag}
                updateFormData={this.props.updateFormData}
                formData={this.props.financialData}>d
              </BaseForm>
            </PanelBody>
          </ZCYPanel>
          <ZCYPanel>
            <PanelBody>
              <PanelSubHeader title="其他主要人员" order="5">
                <Button>
                  <a href="javascript:;"
                    onClick={this.jumpCreate}>新增 </a>
                </Button>
              </PanelSubHeader>
              <Table
                columns={this.columns}
                dataSource={this.props.minorList}
                bordered
                pagination={{
                  total: minorTotal,
                  ...this.state.tableConfig
                }}
              />
            </PanelBody>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

export default keyPersonnel
