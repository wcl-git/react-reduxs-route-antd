import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Select, TreeSelect } from 'zcy-antd'
import { Address } from 'zcy-common'
const FormItem = Form.Item

class AgencyModalForm extends Component {
  render() {
    const { getFieldProps } = this.props.form
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 12 }
    }
    const { auditAgencyList } = this.props

    const { value: phoneValue } = { ...getFieldProps('phone') }

    return (
      <div>
        <Form className="audit-agency-form" horizontal>
          <FormItem {...formItemLayout} label="营业执照地址" type="address">
            <Address type="address" {...getFieldProps('combineArea')} />
          </FormItem>
          <FormItem {...formItemLayout} label="审批机构">
            <TreeSelect
              style={{ width: 220 }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={auditAgencyList}
              placeholder="请选择审批机构"
              treeDefaultExpandAll={false}
            />
            {/* <Select style={{ width: 220 }} {...getFieldProps('siteType')}>
              {auditAgencyList.map((item, idx) => {
                return (
                  <Select.Option key={idx} value={`${item.organic.id}`}>
                    {item.organic.name}
                  </Select.Option>
                )
              })}
            </Select> */}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话">
            <span>
              {phoneValue}
            </span>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const AgencyMFBox = Form.create({
  mapPropsToFields(props) {
    // console.log('mapPropsToFields', props)
    return props.auditAgencyList
  }
})(AgencyModalForm)

export default class AgencyModal extends Component {
  static propTypes = {
    trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    modalName: 'title'
  }

  constructor(props) {
    super(props)
    this.state = { visible: false }
  }

  showModelHandler = e => {
    if (e) e.stopPropagation()
    this.setState({ visible: true })
    this.props.loadAgencyList(this.props.distId)
  }

  hideModelHandler = () => {
    this.setState({ visible: false })
  }

  handleSubmit = (err, values) => {
    this.refs.form.validateFields((err, values) => {
      this.props.onSubmit(err, values)
      if (!err) {
        this.hideModelHandler()
      }
    })
  }

  handleCancel = e => {
    this.hideModelHandler()
  }

  render() {
    const { trigger, modalName, pageData, ...restProps } = this.props

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {trigger}
        </span>
        <Modal
          title={modalName}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          {...restProps}
        >
          <AgencyMFBox ref="form" {...pageData} />
        </Modal>
      </span>
    )
  }
}
