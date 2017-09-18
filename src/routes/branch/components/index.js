import React, { Component } from 'react'
import { ZCYPanel, ZCYForm, ZCYStatus, ZCYContainer, ZCYValidate, ZCYUpload, Address, ZCYUtils } from 'zcy-common'
import { Button, Radio, Breadcrumb, Form, Input, Icon, message, Select, InputNumber } from 'zcy-antd'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { AgencyModal, AgencySubmit, StepTab, getPower } from 'components-common'
const RadioGroup = Radio.Group
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

class branch extends Component {
  constructor(props) {
    super(props)
    this.routerWillLeave = this.routerWillLeave.bind(this)
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  state = {
    modalVisible: false,
    modalType: '',
    isAudit: getPower.isAudit()
  }

  componentDidMount() {
    const { params, location, } = this.props
    const pathName = location.pathname
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    params.id && this.props.init({
      id: params.id,
      orgId
    })
    
    //路由监听
    this.setRouteLeaveHook(this.context.router, this.props.route, this.routerWillLeave)
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

  //确定离开页面
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

  //切换编辑、查看状态
  handleEdit = () => {
    this.props.toggleEdit(true)
  }

  //附件上传相关
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  //取消弹框确认
  onCancleOk = () => {
    if (this.props.page === 'detail') {
      this.setState({
        modalVisible: false
      })
      this.props.toggleEdit(false)
    } else {
      this.context.router.push('/branch/list')
    }
  }

  //点击取消
  handleCancel = () => {
    this.setState({
      modalType: 'cancel',
      modalVisible: true,
      onOk: this.onCancleOk
    })
  }

  //点击保存
  handleSave = () => {
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
    const { params, location, data } = this.props
    /*
    新增页从列表页取
    编辑、详情页从detail接口取
    */
    formData.id = data.id && data.id.value
    //附件
    formData.attachmentMaps = {
      AGE_ORG_BRANCH_FILE: formData.AGE_ORG_BRANCH_FILE
    }
    if (formData.area) {
      //区划
      formData.regProv = formData.area[0]
      formData.regCity = formData.area[1]
      formData.regDist = formData.area[2]
      //改变Redux内地址名
      let text = this.refs.address.label
      this.props.data.area.text = text
    }


    this.props.save(formData).then(() => {
      message.success('保存成功')
      this.context.router.push(('/branch/list'))
    }, () => {
      message.error('保存失败')
      this.setState({
        modalVisible: false
      })
    })
  }

  render() {
    console.log(this.props.isUpdate)
    const { getFieldProps } = this.props.form
    const { userId, editEnable, page, categoryName } = this.props
    const { isAudit } = this.state
    const subordination = getFieldProps('subordination', {
      rules: [...ZCYValidate.required],
      initialValue: 'sub_company'
    })
    const fullName = getFieldProps('fullName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.companyName(60)]
    })
    const area = getFieldProps('area', {
      rules: [...ZCYValidate.required]
    })
    const regAddress = getFieldProps('regAddress', {
      rules: [...ZCYValidate.required, ZCYValidate.maxLen(500)]
    })
    const workNumber = getFieldProps('workNumber', {
      rules: [...ZCYValidate.required, ...ZCYValidate.number]
    })
    const contactName = getFieldProps('contactName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.name]
    })
    const contactPhone = getFieldProps('contactPhone', {
      rules: [...ZCYValidate.required, ...ZCYValidate.mobile]
    })
    const remark = getFieldProps('remark', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(500)]
    })
    const AGE_ORG_BRANCH_FILE = getFieldProps('AGE_ORG_BRANCH_FILE', {
      rules: [...ZCYValidate.required,],
      valuePropName: 'fileList',
      normalize: this.normFile
    })

    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit></AgencySubmit>
          </div>
          <Breadcrumb>
            <Breadcrumb.Item><Link to="/branch/list">分支机构</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>
                {page === 'edit' ? '机构编辑' : page === 'create' ? '机构新增' : '机构详情'}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <ZCYPanel>
            {
              categoryName && categoryName.startsWith('06') && (
                <StepTab></StepTab>
              )
            }
            <PanelHeader title="基本信息">
              <span><Icon type="info-circle-o" />填写说明</span>
              <div style={{ 'display': 'inline-block' }}>
                {
                  !isAudit && (
                    editEnable
                    ?
                    <div>
                      <Button style={{ 'marginRight': '20px' }} onClick={this.handleSave}>保存</Button>
                      <Button onClick={this.handleCancel}>取消</Button>
                    </div>
                    :
                    <Button onClick={this.handleEdit}>编辑</Button>
                  )
                  
                }
              </div>
            </PanelHeader>
            <PanelBody>
              <AgencyModal
                visible={this.state.modalVisible}
                modalType={this.state.modalType}
                onOk={this.state.onOk}
                onCancel={() => { this.setState({ modalVisible: false }) }}
              ></AgencyModal>
              <ZCYForm editEnable={editEnable} >
                <ZCYFormItem
                  label="从属关系"
                  required
                >
                  <Select {...subordination}>
                    <Select.Option value="sub_company">分公司</Select.Option>
                    <Select.Option value="son_comapny">子公司</Select.Option>
                    <Select.Option value="office">办事处</Select.Option>
                    <Select.Option value="other">其他</Select.Option>
                  </Select>
                </ZCYFormItem>
                <ZCYFormItem
                  label="分支机构名称"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入分支机构名称" {...fullName} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="分支机构地址"
                  required
                >
                  <Address
                    type="address"
                    {...area}
                    ref="address"
                  />
                  <Input placeholder="请输入详细地址" {...regAddress }
                    style={{ width: '220px', 'marginLeft': '20px' }} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="工作人员数"
                  required
                >
                  <InputNumber placeholder="请输入工作人员数" {...workNumber} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="负责人"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入负责人姓名" {...contactName} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="联系电话"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入联系电话" {...contactPhone} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="说明"
                  hasFeedback
                  className="zcy-form-item-mtext"
                >
                  <Input placeholder="请输入说明" type="textarea" rows={4} {...remark} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="附件"
                  type="upload"
                  className="zcy-form-item-mtext"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="text"
                    beforeUpload={fileBeforeUpload}
                    {...AGE_ORG_BRANCH_FILE}
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
      </div>
    )
  }
}
branch = Form.create({
  mapPropsToFields(props) {
    return props.data
  },
  onFieldsChange(props, fields) {
    props.updateFormData(fields)
  }
})(branch);

export default branch
