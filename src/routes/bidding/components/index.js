import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Breadcrumb,
  Form,
  Icon,
  Input,
  InputNumber,
  Select,
  Button,
  Radio,
  message
} from 'zcy-antd'
import {
  ZCYContainer,
  ZCYPanel,
  ZCYForm,
  ZCYValidate,
  Address,
  ZCYUpload,
  ZCYUtils
} from 'zcy-common'
const RadioGroup = Radio.Group
const ZCYFormItem = ZCYForm.Item
import { Link } from 'react-router'
import {
  AgencyModal,
  StepTab,
  AgencyStatus,
  AgencySubmit,
  getPower
} from 'components-common'

function beforeUpload(file) {
  const reg = /(.*)\/(jpg|jpeg|png)$/
  const isSuit = reg.test(file.type)

  if (!isSuit) {
    message.error('You can only upload JPG, PNG file!')
  }
  const isLt5M = file.size / 1024 / 1024 < 5
  if (!isLt5M) {
    message.error('Image must smaller than 5MB!')
  }
  return isSuit && isLt5M
}

class AgencyBiddingSite extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: '',
      onOk: null,
      isAudit: getPower.isAudit()
    }
  }

  componentDidMount() {
    const { params } = this.props
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    params.id && this.props.initLoad({
      id: params.id,
      orgId
    })
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  handleEdit = () => {
    this.props.toggleFormState(true)
    if (this.state.modalVisible) {
      this.setState({
        modalVisible: false
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!! ', errors)
        message.warning('请完善数据')
        return
      }

      this.setState({
        modalVisible: true,
        modalType: 'save',
        onOk: () => {
          this.onValidateOk(values)
        }
      })
    })
  }

  //保存弹框确认
  onValidateOk = values => {
    this.props.toggleFormState(false)
    const { params } = this.props
    //不传id为新增,传递id为编辑
    params.id && (values.id = params.id)
    //区划
    values.siteProv = values.combineArea[0]
    values.siteCity = values.combineArea[1]
    values.siteDist = values.combineArea[2]
    delete values.combineArea

    values.attachmentMaps = {
      AGE_SITE_PHOTO: values.AGE_SITE_PHOTO
    }
    delete values.AGE_SITE_PHOTO
    console.log('---submit---values---', values) //表单字段对象
    this.props
      .saveFormData(values)
      .then(() => {
        message.success('保存成功')
        this.context.router.push(`/bidding/list`)
      })
      .catch(e => {
        console.log('axios ', e)
        message.error('保存失败')
        this.setState({
          modalVisible: false
        })
      })
  }

  handleCancel = () => {
    this.setState({
      modalVisible: true,
      modalType: 'cancel',
      onOk: () => {
        this.context.router.push(`/bidding/list`)
      }
    })
  }

  render() {
    const { page, editEnable, USER } = this.props
    const userId = USER.userId

    const { getFieldProps } = this.props.form
    const { isAudit } = this.state

    //场地编号
    const siteCodeProps = getFieldProps('siteCode', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(20)]
    })
    //名称
    const siteNameProps = getFieldProps('siteName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(50)]
    })
    //场地类型
    const siteTypeProps = getFieldProps('siteType', {
      rules: [...ZCYValidate.required]
    })
    //场地地址 select
    const combineAreaProps = getFieldProps('combineArea', {
      rules: [...ZCYValidate.required]
    })
    //场地地址 input
    const siteAddressProps = getFieldProps('siteAddress', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(50)]
    })
    //场地面积
    const siteProportionProps = getFieldProps('siteProportion', {
      rules: [...ZCYValidate.required]
    })
    //最大容纳人数
    const maxCapacityProps = getFieldProps('maxCapacity', {
      rules: [...ZCYValidate.required]
    })
    //是否监控
    const isMonitorProps = getFieldProps('isMonitor', {
      rules: [...ZCYValidate.required]
    })
    // 收费标准
    const chargeStandardProps = getFieldProps('chargeStandard')

    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit />
          </div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/organic/detail">基础信息</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <span>
                {page === 'edit' ? '场地编辑' : page === 'create' ? '场地新增' : '场地详情'}
              </span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]" />
          <StepTab />
          <ZCYPanel>
            <AgencyModal
              visible={this.state.modalVisible}
              modalType={this.state.modalType}
              onOk={this.state.onOk}
              onCancel={() => {
                this.setState({ modalVisible: false })
              }}
            />
            <ZCYPanel.Header title="场地信息">
              {
                !isAudit && (editEnable
                ? <div>
                    <span className="zcy-mr">
                      <Icon
                        type="info-circle-o"
                        style={{ marginRight: '5px' }}
                      />填写说明
                    </span>
                    <Button className="zcy-mr" onClick={this.handleCancel}>
                      取消
                    </Button>
                    <Button onClick={this.handleSubmit}>保存</Button>
                  </div>
                : <Button onClick={this.handleEdit}>编辑</Button>)}
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <ZCYForm editEnable={editEnable} auditEnable={false}>
                <ZCYFormItem label="场地编号" hasFeedback required>
                  <Input placeholder="请输入场地编号" {...siteCodeProps} />
                </ZCYFormItem>
                <ZCYFormItem label="名称" hasFeedback required>
                  <Input placeholder="请输入名称" {...siteNameProps} />
                </ZCYFormItem>
                <ZCYFormItem label="场地类型" required>
                  <Select style={{ width: 220 }} {...getFieldProps('siteType')}>
                    <Select.Option value="site_type_open">开标室</Select.Option>
                    <Select.Option value="site_type_inq">询标室</Select.Option>
                    <Select.Option value="site_type_review">评审室</Select.Option>
                    <Select.Option value="site_type_other">其他</Select.Option>
                  </Select>
                </ZCYFormItem>
                <ZCYFormItem type="address" label="场地地址" required>
                  <Address type="address" {...combineAreaProps} />
                  <Input
                    placeholder="请输入地址"
                    style={{ marginLeft: '10px' }}
                    {...siteAddressProps}
                  />
                </ZCYFormItem>
                <ZCYFormItem label="场地面积" hasFeedback required>
                  <InputNumber
                    style={{ width: 190 }}
                    placeholder="请输入场地面积"
                    {...siteProportionProps}
                  />
                </ZCYFormItem>
                <ZCYFormItem label="最大容纳人数" hasFeedback required>
                  <InputNumber
                    style={{ width: 190 }}
                    placeholder="请输入最大容纳人数"
                    {...maxCapacityProps}
                  />
                </ZCYFormItem>
                <ZCYFormItem label="是否装有固定监控设备" required>
                  <RadioGroup {...isMonitorProps}>
                    <Radio key="1" value={1}>
                      是
                    </Radio>
                    <Radio key="0" value={0}>
                      否
                    </Radio>
                  </RadioGroup>
                </ZCYFormItem>
                <ZCYFormItem label="是否开通电子评审系统">
                  <RadioGroup {...getFieldProps('isReview')}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>
                </ZCYFormItem>
                <ZCYFormItem label="是否已与同级财政监管平台联网">
                  <RadioGroup {...getFieldProps('isOnline')}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>
                </ZCYFormItem>
                <ZCYFormItem label="是否开放">
                  <RadioGroup {...getFieldProps('isOpen')}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </RadioGroup>
                </ZCYFormItem>
                <ZCYFormItem label="收费标准">
                  <InputNumber
                    style={{ width: 190 }}
                    placeholder="收费标准"
                    {...chargeStandardProps}
                  />
                  <span style={{ marginLeft: 10 }}>元/小时</span>
                </ZCYFormItem>
                <ZCYFormItem
                  className="zcy-form-item-mtext"
                  type="upload"
                  label="场地照片"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="picture"
                    beforeUpload={beforeUpload}
                    {...getFieldProps('AGE_SITE_PHOTO', {
                      valuePropName: 'fileList',
                      normalize: this.normFile
                    })}
                  >
                    <Button type="ghost">点击上传</Button>
                  </ZCYUpload>
                </ZCYFormItem>
              </ZCYForm>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return props.formData
  },
  onFieldsChange(props, fields) {
    props.duplexFormData(fields)
  }
})(AgencyBiddingSite)
