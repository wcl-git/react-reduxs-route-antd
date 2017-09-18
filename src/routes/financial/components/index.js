import React, { Component } from 'react'
import { ZCYPanel, ZCYForm, ZCYStatus, ZCYContainer, ZCYValidate, ZCYModal, ZCYUpload, ZCYUtils } from 'zcy-common'
import { Button, Radio, Breadcrumb, Form, Input, Icon, message, InputNumber } from 'zcy-antd'
import { Link } from 'react-router';
import PropTypes from 'prop-types'
import { AgencyModal, StepTab, AgencyStatus, AgencySubmit, getPower } from 'components-common'

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

class financial extends Component {
  static contextTypes = {
    router: PropTypes.shape
  }

  state = {
    modalVisible: false,
    modalType: '',
    onOk: null,
    isAudit: getPower.isAudit()
  }
  constructor(props) {
    super(props)
    this.routerWillLeave = this.routerWillLeave.bind(this)
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
    params.id && (data.id = params.id)

    //金额转换
    data.taxPaid *= 1000000
    data.incomeTax *= 1000000
    data.netProfit *= 1000000
    data.salesMoney *= 1000000
    data.totalProfit *= 1000000

    data.totalAssets *= 1000000
    data.capitalAmount *= 1000000
    data.totalLiabilitie *= 1000000
    data.investmentAbroad *= 1000000
    data.ownershipinterest *= 1000000

    data.attachmentMaps = {
      AGE_ORG_FINANCE_FILE: data.AGE_ORG_FINANCE_FILE
    }

    this.props.save(data).then(() => {
      message.success('保存成功')
      this.context.router.push('/financial/list')
    }, (res) => {
      message.error('保存失败')
      this.setState({
        modalVisible: false
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    const { userId, page, editEnable } = this.props

    const year = getFieldProps('year', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(20)]
    })
    const isAudit = getFieldProps('isAudit', {
      rules: []
    })
    const accountFirm = getFieldProps('accountFirm', {
      rules: [...ZCYValidate.required, ...ZCYValidate.companyName(100)]
    })
    const accountFirmTel = getFieldProps('accountFirmTel', {
      rules: [...ZCYValidate.required, ...ZCYValidate.mobile]
    })
    const remark = getFieldProps('remark', {
      rules: [...ZCYValidate.text(500)]
    })
    //财报附件20m没写
    //下面的都是金额校验
    const totalAssets = getFieldProps('totalAssets', {
      rules: [...ZCYValidate.required]
    })
    const investmentAbroad = getFieldProps('investmentAbroad', {
      rules: [...ZCYValidate.required]
    })
    const ownershipinterest = getFieldProps('ownershipinterest', {
      rules: [...ZCYValidate.required,]
    })
    const totalLiabilitie = getFieldProps('totalLiabilitie', {
      rules: [...ZCYValidate.required,]
    })
    const capitalAmount = getFieldProps('capitalAmount', {
      rules: [...ZCYValidate.required,]
    })
    const assetLiabilityRatio = getFieldProps('assetLiabilityRatio', {
      rules: [...ZCYValidate.required]
    })
    const salesMoney = getFieldProps('salesMoney', {
      rules: [...ZCYValidate.required,]
    })
    const totalProfit = getFieldProps('totalProfit', {
      rules: [...ZCYValidate.required,]
    })
    const taxPaid = getFieldProps('taxPaid', {
      rules: [...ZCYValidate.required,]
    })
    const netProfit = getFieldProps('netProfit', {
      rules: [...ZCYValidate.required,]
    })
    const incomeTax = getFieldProps('incomeTax', {
      rules: [...ZCYValidate.required,]
    })
    const salesProfitMargin = getFieldProps('salesProfitMargin', {
      rules: [...ZCYValidate.required,]
    })

    const AGE_ORG_FINANCE_FILE = getFieldProps('AGE_ORG_FINANCE_FILE', {
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
            <Breadcrumb.Item><Link to="/financial/list">财务信息</Link></Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>
                {page === 'edit' ? '财务编辑' : page === 'create' ? '财务新增' : '财务详情'}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <ZCYPanel>
            <PanelHeader title="基本信息">
              {
                !this.state.isAudit && (
                  <div>
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
                  </div>
                )
              }
            </PanelHeader>
            <PanelBody>
              <AgencyModal
                visible={this.state.modalVisible}
                modalType={this.state.modalType}
                onOk={this.state.onOk}
                onCancel={() => { this.setState({ modalVisible: false }) }}
              ></AgencyModal>
              <PanelSubHeader order="1" title="财报基本信息" />

              <ZCYForm editEnable={editEnable} >
                <ZCYFormItem
                  label="报表年度"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入报表年度" {...year} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="是否经过注册会计师审计"
                >
                  <RadioGroup {...isAudit}>
                    <Radio key="t" value={1}>是</Radio>
                    <Radio key="f" value={0}>否</Radio>
                  </RadioGroup>
                </ZCYFormItem>
                <ZCYFormItem
                  label="会计事务所名称"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入会计事务所名称" {...accountFirm} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="会计事务所电话"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入会计事务所电话" {...accountFirmTel} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="备注"
                  hasFeedback
                  className="zcy-form-item-mtext"
                >
                  <Input placeholder="请输入备注" type="textarea" rows={4} {...remark} />
                </ZCYFormItem>
                <ZCYFormItem
                  label="财报附件"
                  type="upload"
                  className="zcy-form-item-mtext"
                  required
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="text"
                    beforeUpload={fileBeforeUpload}
                    {...AGE_ORG_FINANCE_FILE}
                  >
                    <Button type="ghost">点击上传</Button>
                    <span style={{ marginLeft: 10 }}>
                      附件大小不超过20M, 支持word、excel、pdf格式
                    </span>
                  </ZCYUpload>
                </ZCYFormItem>
                <PanelSubHeader order="2" title="资产负债信息"></PanelSubHeader>
                <ZCYFormItem
                  label="资产总额"
                  required
                >
                  <InputNumber placeholder="请输入资产总额" step={0.000001} {...totalAssets} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="对外投资"
                  required
                >
                  <InputNumber placeholder="请输入对外投资" step={0.000001} {...investmentAbroad} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="所有者权益"
                  required
                >
                  <InputNumber placeholder="请输入所有者权益" step={0.000001} {...ownershipinterest} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="负债总额"
                  required
                >
                  <InputNumber placeholder="请输入负债总额" step={0.000001} {...totalLiabilitie} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="资本金"
                  required
                >
                  <InputNumber placeholder="请输入资本金" step={0.000001} {...capitalAmount} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="资产负债率"
                  required
                >

                  <InputNumber disabled {...assetLiabilityRatio} />
                </ZCYFormItem>
                <PanelSubHeader order="3" title="资产负债信息"></PanelSubHeader>
                <ZCYFormItem
                  label="销售收入"
                  required
                >
                  <InputNumber placeholder="请输入销售收入" step={0.000001} {...salesMoney} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="销售税金及附加"
                  required
                >
                  <InputNumber placeholder="请输入销售税金及附加" step={0.000001} {...totalProfit} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="利润总额"
                  required
                >
                  <InputNumber placeholder="请输入利润总额" step={0.000001} {...taxPaid} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="所得税"
                  required
                >
                  <InputNumber placeholder="请输入所得税" step={0.000001} {...incomeTax} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="净利润"
                  required
                >
                  <InputNumber placeholder="请输入净利润" step={0.000001} {...netProfit} />万元
                </ZCYFormItem>
                <ZCYFormItem
                  label="销售利润率"
                  required
                >
                  <InputNumber {...salesProfitMargin} disabled></InputNumber>
                </ZCYFormItem>
              </ZCYForm>
            </PanelBody>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}
financial = Form.create({
  mapPropsToFields(props) {
    return props.data;
  },
  onFieldsChange(props, fields) {
    props.updateFormData(fields);
    if (!props.isUpdate) {
      props.setUpdateFlag(true)
    }
  }
})(financial);

export default financial
