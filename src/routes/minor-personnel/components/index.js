import React, { Component } from 'react'
import { ZCYPanel, ZCYForm, ZCYStatus, ZCYContainer, ZCYValidate, ZCYUpload, ZCYDatePicker, Address } from 'zcy-common'
import { Button, Radio, Breadcrumb, Form, Input, Icon, message, Modal, Select } from 'zcy-antd'
import { Link } from 'react-router';
import PropTypes from 'prop-types'
import { AgencyModal, StepTab, AgencyStatus, AgencySubmit } from 'components-common'
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

function avatarBeforeUpload(file) {
  const acceptMIME = ['image/jpeg', 'image/jpg', 'image/png']
  const isSuit = acceptMIME.includes(file.type)

  if (!isSuit) {
    message.error('上传图片仅支持 jpg png jpeg 格式!')
  }
  const isLt20M = file.size / 1024 / 1024 < 20
  if (!isLt20M) {
    message.error('图片大小必须小于 20MB!')
  }
  return isSuit && isLt20M
}


class minorPersonnel extends Component {
  static contextTypes = {
    router: PropTypes.shape
  }

  state = {
    modalVisible: false,
    modalType: '',
    onOk: null
  }
  constructor(props) {
    super(props)
    this.routerWillLeave = this.routerWillLeave.bind(this)
  }

  componentDidMount() {
    const { params, location, } = this.props
    const pathName = location.pathname
    params.id && this.props.init(params.id)
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
  //附件上传相关
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }


  //切换编辑、查看状态
  handleEdit = () => {
    this.props.toggleEdit(true)
  }

  //取消弹框确认
  onCancleOk = () => {
    if (this.props.page === 'detail') {
      this.props.toggleEdit(false)
      this.setState({
        modalVisible: false
      })
    } else {
      this.context.router.push('/keyPersonnel/detail')
    }
  }

  //点击取消
  handleCancel = () => {
    this.props.setUpdateFlag(false)
    this.setState({
      modalType: 'cancel',
      modalVisible: true,
      onOk: this.onCancleOk
    })
  }

  //点击保存
  handleSave = () => {
    this.props.setUpdateFlag(false)
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
  onSaveOk = (data) => {
    const { params, location } = this.props
    params.id && (data.id = parseInt(params.id))

    //附件
    data.attachmentMaps = {
      AGE_EMPLOYEE_CARDID: data.AGE_EMPLOYEE_CARDID,
      AGE_ORG_EMPLOYEE_PHOTO: data.AGE_ORG_EMPLOYEE_PHOTO
    }
    if (data.area) {
      //地址
      data.prov = data.area[0]
      data.city = data.area[1]
      data.dist = data.area[2]
      //改变Redux内地址名
      let text = this.refs.address.label
      data.districtFullName = text
      data.area.text = text
    }

    this.props.save(data).then(() => {
      message.success('保存成功')
      this.context.router.push(('/keyPersonnel/detail'))
    }, () => {
      message.error('保存失败')
      this.setState({
        modalVisible: false
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    const { userId, editEnable, page } = this.props
    const type = getFieldProps('type', {
      rules: [...ZCYValidate.required],
      initialValue: '4'
    })
    const name = getFieldProps('name', {
      rules: [...ZCYValidate.name, ...ZCYValidate.required]
    })
    const gender = getFieldProps('gender', {
      rules: [...ZCYValidate.required]
    })
    //身份证
    const cardId = getFieldProps('cardId', {
      rules: [...ZCYValidate.required, ...ZCYValidate.cardId]
    })
    const birthDate = getFieldProps('birthDate', {
      rules: [...ZCYValidate.required]
    })
    const deptName = getFieldProps('deptName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.department]
    })
    const position = getFieldProps('position', {
      rules: [...ZCYValidate.required, ...ZCYValidate.department]
    })
    const phone = getFieldProps('phone', {
      rules: [...ZCYValidate.required, ...ZCYValidate.mobile]
    })
    //办公室电话
    const telephone = getFieldProps('telephone', {
      rules: [...ZCYValidate.required, ...ZCYValidate.telephone]
    })
    //传真
    const fax = getFieldProps('fax', {
      rules: [...ZCYValidate.required, ...ZCYValidate.fax]
    })
    const email = getFieldProps('email', {
      rules: [...ZCYValidate.required, ...ZCYValidate.email]
    })
    //学校
    const graduateInfo = getFieldProps('graduateInfo', {
      rules: [...ZCYValidate.text(20)]
    })
    //毕业时间
    const graduationDate = getFieldProps('graduationDate', {
      rules: []
    })
    //专业
    const profession = getFieldProps('profession', {
      rules: [...ZCYValidate.text(20)]
    })
    //学历
    const educateLevel = getFieldProps('educateLevel', {
      rules: []
    })
    const proTitle = getFieldProps('proTitle', {
      rules: [...ZCYValidate.text(20), ...ZCYValidate.required]
    })
    const postCode = getFieldProps('postCode', {
      rules: [...ZCYValidate.postCode]
    })
    const area = getFieldProps('area', {
      rules: []
    })
    const address = getFieldProps('address', {
      rules: [...ZCYValidate.text(500)]
    })
    const remark = getFieldProps('remark', {
      rules: [...ZCYValidate.text(500)]
    })
    const AGE_EMPLOYEE_CARDID = getFieldProps('AGE_EMPLOYEE_CARDID', {
      rules: [],
      valuePropName: 'fileList',
      normalize: this.normFile
    })
    const AGE_ORG_EMPLOYEE_PHOTO = getFieldProps('AGE_ORG_EMPLOYEE_PHOTO', {
      rules: [],
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
            <Breadcrumb.Item><Link to="/keyPersonnel/detail">主要人员</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>
                {page === 'edit' ? '工作人员编辑' : page === 'create' ? '工作人员新增' : '工作人员详情'}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <ZCYPanel>
            <PanelHeader title="工作人员（次要）">
              <span><Icon type="info-circle-o" />填写说明</span>
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
            </PanelHeader>
            <PanelBody style={{ marginTop: '20px' }}>
              <AgencyModal
                visible={this.state.modalVisible}
                modalType={this.state.modalType}
                onOk={this.state.onOk}
                onCancel={() => { this.setState({ modalVisible: false }) }}
              ></AgencyModal>
              <ZCYForm editEnable={editEnable} >
                <ZCYFormItem
                  label="类型"
                  required
                >
                  <Select {...type}>
                    <Select.Option value="4">业务联系人</Select.Option>
                    <Select.Option value="41">授权代表</Select.Option>
                    <Select.Option value="42">注册联系人</Select.Option>
                    <Select.Option value="43">协议定点项目协调人</Select.Option>
                    <Select.Option value="5">专业(业务)人员</Select.Option>
                    <Select.Option value="51">订单受理</Select.Option>
                    <Select.Option value="59">客户服务</Select.Option>
                    <Select.Option value="7">信息安全专员</Select.Option>
                    <Select.Option value="9">其他</Select.Option>
                    <Select.Option value="52">仓库商品收发</Select.Option>
                    <Select.Option value="53">物流运输</Select.Option>
                    <Select.Option value="54">安装服务</Select.Option>
                    <Select.Option value="55">发票管理</Select.Option>
                    <Select.Option value="56">到款确认</Select.Option>
                    <Select.Option value="57">售后服务</Select.Option>
                    <Select.Option value="58">维修服务</Select.Option>
                    <Select.Option value="59">客户服务</Select.Option>
                    <Select.Option value="5A">执业人员</Select.Option>
                  </Select>
                </ZCYFormItem>
                <ZCYFormItem
                  label="姓名"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入姓名" {...name } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="头像"
                  className="zcy-form-item-mtext"
                  type="upload"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="picture"
                    beforeUpload={avatarBeforeUpload}
                    {...AGE_ORG_EMPLOYEE_PHOTO}
                  >
                    <Button type="ghost">点击上传</Button>
                    <span style={{ marginLeft: 10 }}>图片大小不超过20M,支持png、jpg、jpeg格式</span>
                  </ZCYUpload>
                </ZCYFormItem>
                <ZCYFormItem
                  label="性别"
                >
                  <RadioGroup {...gender}>
                    <Radio key="man" value={0}>男</Radio>
                    <Radio key="wom" value={1}>女</Radio>
                  </RadioGroup>
                </ZCYFormItem>
                <ZCYFormItem
                  label="身份证号码"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入身份证号码" {...cardId } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="出生日期"
                  required
                  type="date"
                >
                  <ZCYDatePicker {...birthDate } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="部门"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入部门" {...deptName } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="职务"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入职务" {...position } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="手机号码"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入手机号码" {...phone } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="办公室电话"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入办公室电话" {...telephone } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="传真"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入传真" {...fax } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="邮箱"
                  hasFeedback
                >
                  <Input placeholder="请输入邮箱" {...email } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="最高学历"
                >
                  <Select  {...educateLevel }>
                    <Select.Option value="31">专科毕业</Select.Option>
                    <Select.Option value="61">高中毕业</Select.Option>
                    <Select.Option value="28">相当大学毕业</Select.Option>
                    <Select.Option value="20">大学本科</Select.Option>
                    <Select.Option value="14">硕士</Select.Option>
                    <Select.Option value="13">博士</Select.Option>
                    <Select.Option value="12">博士后</Select.Option>
                  </Select>
                </ZCYFormItem>
                <ZCYFormItem
                  label="专业"
                  hasFeedback
                >
                  <Input placeholder="请输入专业" {...profession} />
                </ZCYFormItem>
                <ZCYFormItem
                  label=" 毕业时间"
                  hasFeedback
                  type="date"
                >
                  <ZCYDatePicker {...graduationDate } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="毕业院校"
                  hasFeedback
                >
                  <Input placeholder="请输入毕业院校" {...graduateInfo } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="职称"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入职称" {...proTitle } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="邮政编码"
                  hasFeedback
                >
                  <Input placeholder="请输入邮政编码" {...postCode } />
                </ZCYFormItem>
                <ZCYFormItem
                  label="通讯地址"
                >
                  <Address
                    type="address"
                    {...area }
                    ref='address'
                  />
                  <Input placeholder="请输入详细地址" {...address }
                    style={{ width: '220px', 'marginLeft': '20px' }} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="个人介绍"
                  hasFeedback
                  className="zcy-form-item-mtext"
                >
                  <Input placeholder="请输入个人介绍" type="textarea" rows={4} {...remark} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="身份证扫描件"
                  className="zcy-form-item-mtext"
                  type="upload"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    beforeUpload={avatarBeforeUpload}
                    listType="picture"
                    {...AGE_EMPLOYEE_CARDID}
                  >
                    <Button type="ghost">点击上传</Button>
                    <span style={{ marginLeft: 10 }}>
                      扫描件大小不超过20M,支持png、jpg、jpeg格式
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
minorPersonnel = Form.create({
  mapPropsToFields(props) {
    return props.data
  },
  onFieldsChange(props, fields) {
    props.updateFormData(fields)
    if (!props.isUpdate) {
      props.setUpdateFlag(true)
    }
  }
})(minorPersonnel);

export default minorPersonnel
