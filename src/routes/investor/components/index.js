import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  Icon,
  Input,
  InputNumber,
  Select,
  Breadcrumb,
  message,
  Button,
  DatePicker
} from 'zcy-antd'
import { ZCYContainer, ZCYPanel, ZCYForm, ZCYValidate, ZCYUtils } from 'zcy-common'
const ZCYFormItem = ZCYForm.Item
import { Link } from 'react-router'
import {
  AgencyModal,
  StepTab,
  AgencyStatus,
  AgencySubmit,
  getPower
} from 'components-common'

class agencyInvestor extends Component {
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
    //加载货币
    
    const { params } = this.props
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    } else {
      this.props.initConf()
    }
    params.id && this.props.init({
      id: params.id,
      orgId
    })
  }

  handleEdit = () => {
    this.props.toggleEdit(true)
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
    this.props.toggleEdit(false)
    // 预处理数据
    const { params } = this.props
    //不传id为新增,传递id为编辑
    params.id && (values.id = params.id)
    // 金额处理 万-分
    values.investAmount && (values.investAmount *= 1000000)
    // 时间处理
    values['investTime'] = +values['investTime']

    console.log('pre---submit---values---', values) //表单字段对象
    this.props
      .saveFormData(values)
      .then(() => {
        message.success('保存成功')
        this.context.router.push(`/investor/list`)
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
        this.context.router.push(`/investor/list`)
      }
    })
  }

  render() {
    const { page, editEnable, currencyConf } = this.props
    const { getFieldProps } = this.props.form
    const { isAudit } = this.state
    // 出资人
    const investNameProps = getFieldProps('investName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(50)]
    })
    // 出资人类型
    const typeProps = getFieldProps('type', {
      rules: [...ZCYValidate.required]
    })
    // 货币类型
    const currencyProps = getFieldProps('currency', {
      rules: [...ZCYValidate.required]
    })
    // 出资金额
    const investAmountProps = getFieldProps('investAmount', {
      rules: [...ZCYValidate.required, ...ZCYValidate.money]
    })
    // 出资比例
    const investRatioProps = getFieldProps('investRatio', {
      rules: [
        ...ZCYValidate.required,
        {
          validator: function(rule, value, callback) {
            if (+value && +value > 100) {
              callback(new Error('出资比例不能大于100!'))
            } else {
              callback()
            }
          }
        }
      ]
    })
    // 出资时间
    const investTimeProps = getFieldProps('investTime', {
      rules: [...ZCYValidate.required]
    })
    // 说明
    const remarkProps = getFieldProps('remark', {
      rules: [...ZCYValidate.text(500)]
    })

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
                {page === 'edit' ? '出资编辑' : page === 'create' ? '出资新增' : '出资详情'}
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
            <ZCYPanel.Header title="出资人">
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
                : <Button onClick={this.handleEdit}>编辑</Button>
                )}
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <ZCYPanel.SubHeader title="出资情况" />
              <ZCYForm editEnable={editEnable} auditEnable={false}>
                <ZCYFormItem label="出资人" hasFeedback required>
                  <Input placeholder="请输入出资人" {...investNameProps} />
                </ZCYFormItem>
                <ZCYFormItem label="出资人类型" required>
                  <Select
                    placeholder="请选择"
                    style={{ width: 220 }}
                    {...typeProps}
                  >
                    <Select.Option value="10">企业法人</Select.Option>
                    <Select.Option value="11">社会团体法人</Select.Option>
                    <Select.Option value="12">事业法人</Select.Option>
                    <Select.Option value="13">国家授权投资机构或部门</Select.Option>
                    <Select.Option value="2">自然人</Select.Option>
                    <Select.Option value="14">合伙企业</Select.Option>
                  </Select>
                  <Select
                    style={{ marginLeft: 10 }}
                    placeholder="请选择货币类型"
                    {...currencyProps}
                  >
                    {currencyConf.map((item, idx) => {
                      return (
                        <Select.Option key={idx} value={item.code}>
                          {item.name}
                        </Select.Option>
                      )
                    })}
                  </Select>
                </ZCYFormItem>
                <ZCYFormItem label="出资额" required>
                  <Input placeholder="请输入出资额" {...investAmountProps} />
                  <span style={{ marginLeft: 10 }}>万元</span>
                </ZCYFormItem>
                <ZCYFormItem label="出资比例" hasFeedback required>
                  <InputNumber
                    style={{ width: 220 }}
                    placeholder="请输入出资比例"
                    {...investRatioProps}
                  />
                  <span style={{ marginLeft: 10 }}>%</span>
                </ZCYFormItem>
                <ZCYFormItem label="出资时间" required type="date">
                  <DatePicker {...investTimeProps} />
                </ZCYFormItem>
                <ZCYFormItem label="说明" hasFeedback>
                  <Input
                    type="textarea"
                    style={{ height: '50px' }}
                    {...remarkProps}
                  />
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
})(agencyInvestor)
