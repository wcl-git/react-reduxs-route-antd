import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'zcy-antd'

export default class AgencyModal extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    modalType: PropTypes.string
  }

  createConfig = (mtitle, mchildren) => {
    let { title, onOk, onCancel, children } = this.props
    return {
      onOk,
      title: title || mtitle,
      onCancel: onCancel,
      children: children || mchildren
    }
  }

  getModalConfig = modalType => {
    switch (modalType) {
      case 'revoke':
        return this.createConfig('撤销', <p>您确定要撤销吗？</p>)
      case 'cancel':
        return this.createConfig('取消', <p>您确定要取消吗？</p>)
      case 'recall':
        return this.createConfig('撤回', <p>您确定要撤回吗？</p>)
      case 'save':
        return this.createConfig('保存', <p>您确定要保存吗？</p>)
      case 'delete':
        return this.createConfig('删除', <p>您确定要删除吗？</p>)
      case 'submit':
        return this.createConfig('提交审核', <p>您确定要提交吗？</p>)
      case 'leave':
        return this.createConfig('离开', <p>您确定要离开此页面吗？</p>)
      case 'register':
        return this.createConfig('注册', <p>您确定要注册吗？</p>)
    }
  }

  render() {
    const { modalType, visible } = this.props
    return <Modal visible={visible} {...this.getModalConfig(modalType) } />
  }
}
