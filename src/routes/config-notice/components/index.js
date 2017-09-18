import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, message } from 'zcy-antd'
import { ZCYContainer, ZCYPanel } from 'zcy-common'
import AgencyModal from 'components-common/agency-modal'

import RegisterForm from './register'
import ModifyForm from './modify'

class PublicityManageConfig extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: '',
      onOk: null
    }
  }

  componentDidMount() {
    this.props.getConf()
  }

  handleSubmit = e => {
    e.preventDefault()
    const postValues = {
      auditConfigs: []
    }
    this.refs.register.validateFieldsAndScroll((errs, registerValues) => {
      if (!!errs) {
        console.log('Errors in form!!! ', errs)
        message.warning('请完善数据')
        return
      }
      postValues.auditConfigs.push(registerValues)

      this.refs.modify.validateFieldsAndScroll((errors, modifyValues) => {
        if (!!errors) {
          console.log('Errors in form!!! ', errors)
          message.warning('请完善数据')
          return
        }
        postValues.auditConfigs.push(modifyValues)

        console.log(postValues)
        this.setState({
          modalVisible: true,
          modalType: 'save',
          onOk: () => {
            this.onValidateOk(postValues)
          }
        })
      })
    })
  }

  //保存弹框确认
  onValidateOk = values => {
    this.props
      .saveConf(values)
      .then(() => {
        message.success('保存成功')
        this.setState({
          modalVisible: false
        })
      })
      .catch(e => {
        console.log('axios ', e)
        message.error('保存失败')
        this.setState({
          modalVisible: false
        })
      })
  }

  render() {
    return (
      <div>
        <ZCYContainer>
          <AgencyModal
            visible={this.state.modalVisible}
            modalType={this.state.modalType}
            onOk={this.state.onOk}
            onCancel={() => {
              this.setState({ modalVisible: false })
            }}
          />
          <ZCYPanel>
            <ZCYPanel.Header title="公示管理配置">
              <Button type="primary" onClick={this.handleSubmit}>
                保存
              </Button>
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <RegisterForm
                ref="register"
                registerConf={this.props.registerConf}
                duplexFormData={this.props.duplexFormData}
              />
              <div style={{ marginTop: 20 }} />
              <ModifyForm
                ref="modify"
                modifyConf={this.props.modifyConf}
                duplexFormData={this.props.duplexFormData}
              />
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

export default PublicityManageConfig
