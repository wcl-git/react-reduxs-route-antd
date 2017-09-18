### ZCYValidate
政采云表单校验规则，配合 antd 表单校验使用

### Usage
```jsx
import React, { Component } from 'react'
import { Form } from 'zcy-antd'
import { ZCYForm, ZCYValidate } from 'zcy-common'

class DEMO extends Component{
  render() {
      const { getFieldProps } = this.props.form
      const siteCodeProps = getFieldProps('siteCode', {
        rules: [...ZCYValidate.required, ...ZCYValidate.text20]
      })

      return (
        <ZCYForm editEnable={editEnable} auditEnable={false}>
            <ZCYFormItem label="场地编号" hasFeedback required>
              <Input placeholder="请输入场地编号" {...siteCodeProps} />
            </ZCYFormItem>
        </ZCYForm>
      )
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return props.formData
  }
})(DEMO)
```
