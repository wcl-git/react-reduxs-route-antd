import React, { Component } from 'react'
import { ZCYPanel, ZCYForm, ZCYStatus, ZCYContainer, ZCYValidate, Address, ZCYUpload, ZCYDatePicker, ZCYUtils } from 'zcy-common'
import { Button, Form, Input, Breadcrumb, Icon, DatePicker, Select, Modal, message, TreeSelect, InputNumber } from 'zcy-antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { AgencyModal, StepTab, AgencyStatus, AgencySubmit, getPower } from 'components-common'

const PanelHeader = ZCYPanel.Header
const PanelBody = ZCYPanel.Body
const PanelSubHeader = ZCYPanel.SubHeader
const ZCYFormItem = ZCYForm.Item

function fileBeforeUpload(file) {
  const acceptMIME = [
    'application/pdf',
    'application/x-pdf',
    'application/msword',
    'application/vnd.ms-excel'
  ]
  const isSuit = acceptMIME.includes(file.type)

  if (!isSuit) {
    message.error('上传文件仅支持 word, excel, pdf 格式!')
  }
  const isLt20M = file.size / 1024 / 1024 < 20
  if (!isLt20M) {
    message.error('文件大小必须小于 20MB!')
  }
  return isSuit && isLt20M
}

class achievement extends Component {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  componentDidMount() {
    const { params, location } = this.props
    const pathName = location.pathname
    let orgId
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }

    params.id && this.props.init({
      id: params.id,
      orgId
    })

    if (this.props.editEnable === true) {
      this.leaveFlag = false
    }
    //路由监听
    this.setRouteLeaveHook(this.context.router, this.props.route, this.routerWillLeave)

    //获取专职人员数据
    this.props.getProUser().then((result) => {
      let treeData = this.renderTreeData(result)
      this.setState({
        treeData
      })
    })
  }

  //路由切换标识位
  leaveFlag = true
  //路由死循环控制
  routeFlag = false

  //路由切换回调
  routerWillLeave = (nextLocation) => {
    if (!this.leaveFlag) {
      this.setState({
        modalVisible: true,
        modalType: 'leave',
        onOk: () => { this.onLeaveOk(nextLocation.pathname) },
      })
    } else {
      this.context.router.push(nextLocation.pathname)
    }
    return this.leaveFlag
  }

  //确定离开
  onLeaveOk = (nextLocation) => {
    this.context.router.push(nextLocation)
    this.leaveFlag = true
  }

  //弹框取消
  onCancleNo = () => {
    this.leaveFlag = false
    this.routeFlag = false
    this.setState({
      modalVisible: false
    })
  }

  //路由监听
  setRouteLeaveHook = (router, route, hook) => {
    router.setRouteLeaveHook(route, nextLocation => {
      if (!this.routeFlag) {
        this.routeFlag = true
        return hook(nextLocation)
      }
    })
  }

  //渲染下拉框数据
  renderTreeData = (data) => {
    return data.map((item, index) => {
      return {
        label: item.name,
        value: item.id,
        key: +new Date() + index
      }
    })
  }

  //弹框
  state = {
    modalVisible: false,
    modalType: '',
    onOk: null,
    treeData: [],
    isAudit: getPower.isAudit()
  }

  //附件上传相关
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  //编辑状态切换
  handleEdit = () => {
    this.leaveFlag = false
    this.props.toggleEdit(true)
  }

  //点击取消
  handleCancel = () => {
    this.leaveFlag = true
    this.setState({
      modalType: 'cancel',
      modalVisible: true,
      onOk: this.onCancleOk
    })
  }

  //取消弹框确认
  onCancleOk = () => {
    if (this.props.page === 'detail') {
      this.setState({
        modalVisible: false
      })
      this.props.toggleEdit(false)
    } else {
      this.context.router.push('/financial/list')
    }
  }

  //点击保存
  handleSave = () => {
    this.leaveFlag = true
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.warning('请完善数据')
        return
      }
      this.setState({
        modalType: 'save',
        modalVisible: true,
        onOk: () => { this.onSaveOk(values) }
      })
    })
  }

  //保存弹框确认
  onSaveOk = (formData) => {
    const { location, data, params } = this.props
    /*
    prouserId发请求取
    编辑、详情页从detail接口取
    */
    formData.performanceType = params.performanceType ? params.performanceType : data.performanceType.value
    formData.handleName = formData.proUserId.label
    formData.proUserId = formData.proUserId.value

    params.id && (formData.id = params.id)
    if (formData.area) {
      //地址
      formData.companyProv = formData.area[0]
      formData.companyCity = formData.area[1]
      formData.companyDist = formData.area[2]
      //改变Redux内地址名
      let text = this.refs.address.label
      formData.area.text = text
    }

    //附件
    formData.attachmentMaps = {
      AGE_PERFORMANCE_BIDNOTICE: formData.AGE_PERFORMANCE_BIDNOTICE,
      AGE_PERFORMANCE_CONTRACT: formData.AGE_PERFORMANCE_CONTRACT,
      AGE_PERFORMANCE_PURCHASE: formData.AGE_PERFORMANCE_PURCHASE
    }

    //金额转换
    formData.budgetAmount && (formData.budgetAmount *= 1000000)
    formData.dealAmount && (formData.dealAmount *= 1000000)
    
    //节资率转化
    formData.saveRate /= 100

    this.props.save(formData).then(() => {
      message.success('保存成功')
      this.context.router.push(('/achievement/list'))
    }, () => {
      message.error('保存失败')
      this.setState({
        modalVisible: false
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    const { userId, page, editEnable } = this.props;
    const { isAudit } = this.state
    const projectCode = getFieldProps('projectCode', {
      rules: [...ZCYValidate.required, ZCYValidate.maxLen(20)]
    })
    const saveRate = getFieldProps('saveRate', {
      rules: [...ZCYValidate.required]
    })
    const evaluate = getFieldProps('evaluate', {
      rules: [...ZCYValidate.required]
    })
    const dealAmount = getFieldProps('dealAmount', {
      rules: [...ZCYValidate.required]
    })
    const budgetAmount = getFieldProps('budgetAmount', {
      rules: [...ZCYValidate.required]
    })
    const bidCompany = getFieldProps('bidCompany', {
      rules: [...ZCYValidate.required, ...ZCYValidate.companyName(100)]
    })
    const addressCode = getFieldProps('addressCode', {
      // rules: [...ZCYValidate.required]
    })
    const projectName = getFieldProps('projectName', {
      rules: [...ZCYValidate.required, ZCYValidate.maxLen(100)]
    })
    const projectType = getFieldProps('projectType', {
      rules: [...ZCYValidate.required],
      initialValue: "perform_type_service"
    })
    const companyName = getFieldProps('companyName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.companyName(100)]
    })
    const entrustCompany = getFieldProps('entrustCompany', {
      rules: [...ZCYValidate.required, ...ZCYValidate.companyName(100)]
    })
    const notificationDate = getFieldProps('notificationDate', {
      rules: [...ZCYValidate.required]
    })
    const confirmNumber = getFieldProps('confirmNumber', {
      rules: [...ZCYValidate.required, ...ZCYValidate.number]
    })
    const purchaseWay = getFieldProps('purchaseWay', {
      rules: [...ZCYValidate.required],
      initialValue: "perform_procure_open"
    })
    const proUserId = getFieldProps('proUserId', {
      rules: [...ZCYValidate.required]
    })
    const handlePhone = getFieldProps('handlePhone', {
      rules: [...ZCYValidate.required, ...ZCYValidate.mobile]
    })
    const area = getFieldProps('area', {
      rules: [...ZCYValidate.required]
    })
    //委托协议  
    const AGE_PERFORMANCE_CONTRACT = getFieldProps('AGE_PERFORMANCE_CONTRACT', {
      rules: [...ZCYValidate.required,],
      valuePropName: 'fileList',
      normalize: this.normFile
    })

    const AGE_PERFORMANCE_BIDNOTICE = getFieldProps('AGE_PERFORMANCE_BIDNOTICE', {
      rules: [...ZCYValidate.required,],
      valuePropName: 'fileList',
      normalize: this.normFile
    })

    const AGE_PERFORMANCE_PURCHASE = getFieldProps('AGE_PERFORMANCE_PURCHASE', {
      rules: [...ZCYValidate.required,],
      valuePropName: 'fileList',
      normalize: this.normFile
    })

    return (
      <div >
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit></AgencySubmit>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/achievement/list">业绩信息</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>
                {page === 'edit' ? '业绩编辑' : page === 'create' ? '业绩新增' : '业绩详情'}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer >
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <ZCYPanel>
            <PanelHeader title="业绩信息">
              {
                !isAudit && (
                  <div>
                    <span className="filling-explanation">
                      <span><Icon type="info-circle-o" />填写说明</span>
                    </span>
                    <div style={{ 'display': 'inline-block' }}>
                      {
                        editEnable
                          ?
                          <div>
                            <Button style={{ 'marginRight': '20px' }} onClick={this.handleSave}>保存</Button>
                            <Button onClick={this.handleCancel}>取消</Button>
                          </div>
                          :
                          <Button onClick={this.handleEdit}>编辑</Button>
                      }
                    </div>
                  </div>
                )
              }
            </PanelHeader>
            <PanelBody style={{ marginTop: '20px' }}>
              <AgencyModal
                visible={this.state.modalVisible}
                modalType={this.state.modalType}
                onOk={this.state.onOk}
                onCancel={this.onCancleNo}
              ></AgencyModal>
              <ZCYForm editEnable={editEnable}  >
                <ZCYFormItem
                  label="项目编号"
                  hasFeedback
                  required

                >
                  <Input placeholder="请输入项目编号" {...projectCode } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="项目名称"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入项目名称" {...projectName} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="项目类型"
                  required
                >
                  <Select {...projectType}>
                    <Select.Option value="perform_type_project">工程类</Select.Option>
                    <Select.Option value="perform_type_service">服务类</Select.Option>
                    <Select.Option value="perform_type_goods">货物类</Select.Option>
                  </Select>
                </ZCYFormItem>
                <ZCYFormItem
                  label="采购单位名称"
                  hasFeedback
                >
                  <Input placeholder="请输入采购单位名称" {...companyName} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="采购单位所属行政区划"
                  required
                >
                  <Address
                    type="address"
                    {...area}
                    ref="address"
                  />
                </ZCYFormItem>
                <ZCYFormItem
                  label="委托单位名称"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入委托单位名称" {...entrustCompany} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="中标/成交通知发出时间"
                  required
                  type="date"
                >
                  <ZCYDatePicker {...notificationDate} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="采购计划文号"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入采购计划文号" {...confirmNumber} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="采购方式"
                  required
                >
                  <Select {...purchaseWay}>
                    <Select.Option value="perform_procure_open">公开招标</Select.Option>
                    <Select.Option value="perform_procure_negotiate">竞争性谈判</Select.Option>
                    <Select.Option value="perform_procure_single">单一来源采购</Select.Option>
                    <Select.Option value="perform_procure_enquiry">询价采购</Select.Option>
                    <Select.Option value="perform_procure_invite">邀请招标</Select.Option>
                    <Select.Option value="performance_invited_negotiate">竞争性磋商</Select.Option>
                  </Select>
                </ZCYFormItem>
                <ZCYFormItem
                  label="中标/成交供应商"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入中标/成交供应商" {...bidCompany} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="专职人员姓名"
                  required
                  type="tree"
                >
                  <TreeSelect
                    showSearch={true}
                    treeData={this.state.treeData}
                    labelInValue={true}
                    treeNodeFilterProp='label'
                    dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                    placeholder="请选择"
                    searchPlaceholder="请搜索"
                    {...proUserId}
                  >
                  </TreeSelect>
                </ZCYFormItem>
                <ZCYFormItem
                  label="联系电话"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入联系电话" {...handlePhone} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="预算金额"
                  required
                >
                  <InputNumber placeholder="请输入预算金额" step={0.000001} {...budgetAmount} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="成交金额"
                  required
                >
                  <InputNumber placeholder="请输入成交金额" step={0.000001} {...dealAmount} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="节资率"
                  required
                >
                  <InputNumber max={100} placeholder="请输入节资率" step={0.01} {...saveRate} />%
                </ZCYFormItem>
                <ZCYFormItem
                  label="评价得分"
                  required
                >
                  <InputNumber placeholder="请输入评价得分" step={0.01} {...evaluate} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="委托协议"
                  required
                  type="upload"
                  className="zcy-form-item-mtext"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    type="upload"
                    beforeUpload={fileBeforeUpload}
                    {...AGE_PERFORMANCE_CONTRACT}
                  >
                    <Button type="ghost">点击上传</Button>
                    <span style={{ marginLeft: 10 }}>
                      附件大小不超过20M, 支持word、excel、pdf格式
                    </span>
                  </ZCYUpload>
                </ZCYFormItem>
                <ZCYFormItem
                  label="中标/成交通知书"
                  required
                  className="zcy-form-item-mtext"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    beforeUpload={fileBeforeUpload}
                    listType="text"
                    type="upload"
                    {...AGE_PERFORMANCE_BIDNOTICE}
                  >
                    <Button type="ghost">点击上传</Button>
                    <span style={{ marginLeft: 10 }}>
                      附件大小不超过20M, 支持word、excel、pdf格式
                    </span>
                  </ZCYUpload>
                </ZCYFormItem>
                <ZCYFormItem
                  label="采购合同"
                  className="zcy-form-item-mtext"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="text"
                    type="upload"
                    beforeUpload={fileBeforeUpload}
                    {...AGE_PERFORMANCE_PURCHASE}
                  >
                    <Button type="ghost">点击上传</Button>
                    <span style={{ marginLeft: 10 }}>
                      附件大小不超过20M, 支持word、excel、pdf格式
                    </span>
                  </ZCYUpload>
                </ZCYFormItem>
              </ZCYForm>
            </PanelBody>
          </ZCYPanel>
        </ZCYContainer>
      </div >
    )
  }
}

achievement = Form.create({
  mapPropsToFields(props) {
    return props.data;
  },
  onFieldsChange(props, fields) {
    props.updateFormData(fields)
  }
})(achievement);

export default achievement
