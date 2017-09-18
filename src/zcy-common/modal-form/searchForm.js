import React, { Component } from 'react'
import { Form, Input } from 'zcy-antd'
const FormItem = Form.Item

class SearchForm extends Component {
  render() {
    // const { children } = this.props
    const { getFieldProps } = this.props.form
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    }
    return (
      <div>
        <Form horizontal>
          <FormItem {...formItemLayout} label="单号">
            <Input {...getFieldProps('number')} />
          </FormItem>
          <FormItem {...formItemLayout} label="关键字">
            <Input {...getFieldProps('keyWord')} />
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(SearchForm)
