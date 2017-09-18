import React, { Component } from 'react'
import { Form, Input, Radio, message } from 'zcy-antd'
import { ZCYContainer, ZCYPanel, ZCYForm, ZCYValidate } from 'zcy-common'

const RadioGroup = Radio.Group
const ZCYFormItem = ZCYForm.Item

class ModifyForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDisabled: false,
      radioValue: ''
    }
  }

  onRadioChange = e => {
    if (!e.target.value) {
      this.setState({
        isDisabled: true,
        radioValue: e.target.value
      })
    } else {
      this.setState({
        isDisabled: false,
        radioValue: e.target.value
      })
    }
  }

  render() {
    const { getFieldProps } = this.props.form

    //是否公示
    const isNoticeProps = getFieldProps('isNotice', {
      rules: [...ZCYValidate.required],
      onChange: this.onRadioChange
    })

    return (
      <ZCYForm editEnable={true}>
        <div className="modify-config">
          <ZCYPanel.SubHeader title="变更公示与入库配置" />
          <div style={{ marginBottom: 10 }}>
            <span>变更注册是否公示: </span>
            <RadioGroup {...isNoticeProps}>
              <Radio value={true}>公示</Radio>
              <Radio value={false}>不公示</Radio>
            </RadioGroup>
          </div>
        </div>
        <ZCYFormItem label="机构变更公示是否审核">
          <RadioGroup {...getFieldProps('isAuditNotice')}>
            <Radio value={true} disabled={this.state.isDisabled}>
              审核
            </Radio>
            <Radio value={false} disabled={this.state.isDisabled}>
              不审核
            </Radio>
          </RadioGroup>
        </ZCYFormItem>
        <ZCYFormItem label="id" style={{ display: 'none' }}>
          <Input {...getFieldProps('id')} />
        </ZCYFormItem>
        <ZCYFormItem label="机构变更公示时间">
          <Input
            style={{ width: 60 }}
            disabled={this.state.isDisabled}
            {...getFieldProps('noticeDay', {
              rules: [...ZCYValidate.number]
            })}
          />
          <span style={{ marginLeft: 10 }}>天</span>
        </ZCYFormItem>
        <ZCYFormItem label="机构变更入库是否审核">
          <RadioGroup {...getFieldProps('isAuditFormal')}>
            <Radio value={true} disabled={this.state.isDisabled}>
              审核
            </Radio>
            <Radio value={false} disabled={this.state.isDisabled}>
              不审核
            </Radio>
          </RadioGroup>
        </ZCYFormItem>
      </ZCYForm>
    )
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return props.modifyConf
  },
  onFieldsChange(props, fields) {
    props.duplexFormData(fields, 'modifyConf')
  }
})(ModifyForm)
