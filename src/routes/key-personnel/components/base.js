import { ZCYPanel, ZCYForm, ZCYStatus, ZCYContainer, ZCYValidate, ZCYUpload, ZCYDatePicker, Address } from 'zcy-common'
import { Button, Radio, Form, Input, Select } from 'zcy-antd'
import React, { Component } from 'react'

const RadioGroup = Radio.Group
const PanelHeader = ZCYPanel.Header
const PanelBody = ZCYPanel.Body
const PanelSubHeader = ZCYPanel.SubHeader
const ZCYFormItem = ZCYForm.Item

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

class BaseForm extends Component {

  //附件上传相关
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldProps } = this.props.form
    const { userId } = this.props
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
    const form = [
      <ZCYFormItem
        label="姓名"
        hasFeedback
        required
      >
        <Input placeholder="请输入姓名" {...name } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="头像"
        type="upload"
        className="zcy-form-item-mtext"
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
      </ZCYFormItem>,
      <ZCYFormItem
        label="性别"
      >
        <Radio.Group {...gender }>
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </Radio.Group>
      </ZCYFormItem>,
      <ZCYFormItem
        label="身份证号码"
        hasFeedback
        required
      >
        <Input placeholder="请输入身份证号码" {...cardId } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="出生日期"
        required
        type="date"
      >
        <ZCYDatePicker {...birthDate } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="部门"
        hasFeedback
        required
      >
        <Input placeholder="请输入部门" {...deptName } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="职务"
        hasFeedback
        required
      >
        <Input placeholder="请输入职务" {...position } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="手机号码"
        hasFeedback
        required
      >
        <Input placeholder="请输入手机号码" {...phone } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="办公室电话"
        hasFeedback
        required
      >
        <Input placeholder="请输入办公室电话" {...telephone } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="传真"
        hasFeedback
        required
      >
        <Input placeholder="请输入传真" {...fax } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="邮箱"
        hasFeedback
      >
        <Input placeholder="请输入邮箱" {...email } />
      </ZCYFormItem>,
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
      </ZCYFormItem>,
      <ZCYFormItem
        label="专业"
        hasFeedback
      >
        <Input placeholder="请输入专业" {...profession} />
      </ZCYFormItem>,
      <ZCYFormItem
        label="毕业时间"
        hasFeedback
        type="date"
      >
        <ZCYDatePicker {...graduationDate} />
      </ZCYFormItem>,
      <ZCYFormItem
        label="毕业院校"
        hasFeedback
      >
        <Input placeholder="请输入毕业院校" {...graduateInfo } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="职称"
        hasFeedback
        required
      >
        <Input placeholder="请输入职称" {...proTitle } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="邮政编码"
        hasFeedback
      >
        <Input placeholder="请输入邮政编码" {...postCode } />
      </ZCYFormItem>,
      <ZCYFormItem
        label="通讯地址"
        type="address"
      >
        <Address
          type="address"
          {...area}
          ref={this.props.address}
        />
        <Input placeholder="请输入详细地址" {...address }
          style={{ width: '220px', 'marginLeft': '20px' }} />
      </ZCYFormItem>,
      <ZCYFormItem
        label="个人介绍"
        hasFeedback
        className="zcy-form-item-mtext"
      >
        <Input placeholder="请输入个人介绍" type="textarea" rows={4} {...remark} />
      </ZCYFormItem>,
      <ZCYFormItem
        label="身份证扫描件"
        type="upload"
        className="zcy-form-item-mtext"
      >
        <ZCYUpload
          bizCode="1099"
          userId={`${userId}`}
          listType="picture"
          beforeUpload={avatarBeforeUpload}
          {...AGE_EMPLOYEE_CARDID}
        >
          <Button type="ghost">点击上传</Button>
          <span style={{ marginLeft: 10 }}>扫描件大小不超过20M,支持png、jpg、jpeg格式</span>
        </ZCYUpload>
      </ZCYFormItem>]

    return (
      <ZCYForm editEnable={this.props.editEnable}>
        {form}
      </ZCYForm>
    )
  }
}

BaseForm = Form.create({
  mapPropsToFields(props) {
    return props.formData;
  },
  onFieldsChange(props, fields) {
    props.updateFormData({
      key: props.director,
      value: fields
    })
    if (!props.isUpdate) {
      props.setUpdateFlag(true)
    }
  }
})(BaseForm)

export default BaseForm