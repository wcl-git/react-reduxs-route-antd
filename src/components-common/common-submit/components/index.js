import React, { Component } from 'react'
import { Button, message, Modal, Form, Radio, Input } from 'zcy-antd'
import { ZCYUtils } from 'zcy-common'
import AgencyModal from '../../agency-modal'
import getPower from '../../agency-power'

class AgencySubmit extends Component {
  state = {
    modalType: 'submit',
    modalVisible: false,
    onOk: null,
    auditModalVisible: false,
    auditModalOk: null,
    agree: '',
    disAgree: '',
    formItemLayout: {
      labelCol: { 
        span: 6
      },
      wrapperCol: { 
        span: 18
      },
    },
    isAudit: getPower.isAudit()
  }

  submit = () => {
    this.setState({
      onOk: this.agencySubmit,
      modalVisible: true
    })
  }

  agencySubmit = () => {
    this.props.agencySubmit().then(res => {
      message.success('提交审核成功')
      this.setState({
        modalVisible: false
      })
    })
  }

  approval = () => {
    let id = getPower.auditId();
    let state = getPower.state();
    this.transformState(state)
    this.setState({
      auditModalVisible: true,
      auditModalOk: () => this.approvalSubmit()
    })
  }

  transformState = (state) => {
    switch (state) {
      case 'FIRST_ORG':
        this.setState({
          agree: 'APPROVAL_FIRST_AGREE',
          disAgree: 'APPROVAL_FIRST_NUAGREE'
        });
        break;
      case 'AGAIN_ORG':
        this.setState({
          agree: 'APPROVAL_FINAL_AGREE',
          disAgree: 'APPROVAL_FINAL_NUAGREE'
        });
        break;
    }
  }

  approvalSubmit = () => {
    const { agencyAuditInfo } = this.props;
    let auditId;
    if (this.state.isAudit) {
      auditId = getPower.auditId()
    }
    debugger
    this.props.approvalSubmit({
      approvalId: auditId,
      auditParams: agencyAuditInfo
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    const { modalVisible, isAudit, onOk, modalType, auditModalVisible, auditModalOk, agree, disAgree, formItemLayout } = this.state
    return (
      <div>
        {
          isAudit ? (
            <Button type="primary" onClick={this.approval}>
              审批
            </Button>
          ) : (
            <Button type="primary" onClick={this.submit}>
              提交审核
            </Button>
          )
        }
        <AgencyModal
          visible={modalVisible}
          onOk={onOk}
          modalType={modalType}
          onCancel={() => {
            this.setState({ modalVisible: false })
          }}
        />
        <Modal
          title="审批"
          visible={auditModalVisible}
          onOk={auditModalOk}
          onCancel={() => this.setState({auditModalVisible: false})}
        >
          <Form horizontal>
            <Form.Item
              {...formItemLayout}
              label="审批结果"
            >
              <Radio.Group  {...getFieldProps('workFlowNode')}>
                <Radio value={agree}>通过</Radio>
                <Radio value={disAgree}>不通过</Radio>
              </Radio.Group>
            </Form.Item>
            {
              getPower.state() === 'AGAIN_ORG' && (
                <Form.Item
                  {...formItemLayout}
                  label="书面材料上报时间"
                >
                  <ZCYDatePicker {...getFieldProps('reportTime')}/>
                </Form.Item>
              )
            }
            <Form.Item
              style={{marginBottom: 0}}
              {...formItemLayout}
              label="审批意见"
            >
              <Input type="textarea" {...getFieldProps('approvalRemark')}/>
            </Form.Item>
            
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Form.create()(AgencySubmit);