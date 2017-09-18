import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form } from 'zcy-antd'
import SearchForm from './searchForm'

class ModalForm extends Component {
  static propTypes = {
    trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
      .isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  static defaultProps = {
    modalName: '高级搜索'
  }

  state = { visible: false }

  showModelHandler = e => {
    if (e) e.stopPropagation()
    this.setState({ visible: true })
  }

  hideModelHandler = () => {
    this.setState({ visible: false })
  }

  handleSubmit = (err, values) => {
    this.refs.form.validateFields((err, values) => {
      this.props.onSubmit(err, values)
      console.log(values)
      if (!err) {
        this.hideModelHandler()
      }
    })
  }

  handleReset = e => {
    if (
      e.target.parentNode.innerText.replace(/\s/g, '') === '重置' ||
      e.target.nodeName.toLowerCase() === 'button'
    ) {
      return this.refs.form.resetFields()
    }
    this.hideModelHandler()
  }

  render() {
    const { trigger, modalName, ...restProps } = this.props

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {trigger}
        </span>
        <Modal
          title={modalName}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleReset}
          {...restProps}
        >
          <SearchForm ref="form" />
        </Modal>
      </span>
    )
  }
}

export default ModalForm
