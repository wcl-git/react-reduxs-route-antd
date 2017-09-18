import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'zcy-antd'
import { ZCYContainer, ZCYPanel, ZCYVsteps } from 'zcy-common'
const Step = ZCYVsteps.Step
import './style.less'
import { browserHistory } from 'react-router'

export default class AuditExplain extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.init()
  }

  render() {
    const { agencyInfo } = this.props
    const { name = '', phone = '' } = agencyInfo

    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <Button onClick={browserHistory.goBack}>返回</Button>
          </div>
        </div>
        <ZCYContainer>
          <ZCYPanel>
            <ZCYPanel.Header title="审核说明" />
            <ZCYPanel.Body>
              <ZCYPanel.SubHeader title="注册审核说明" />
              <div className="step-container">
                <ZCYVsteps>
                  <Step description="请按照要求填写注册信息，填写完成后提交审核。" />
                  <Step
                    description={`提交审核后会进行初核与复核，由 ${name} 审核，联系电话：${phone}。`}
                  />
                  <Step description={`公示，由 ${name} 执行，联系电话：${phone}。`} />
                  <Step description={`入库，由 ${name} 执行，联系电话：${phone}。`} />
                </ZCYVsteps>
              </div>
              <ZCYPanel.SubHeader title="变更审核说明" />
              <div className="step-container">
                <ZCYVsteps>
                  <Step description="请按照要求填写注册信息，填写完成后提交审核。" />
                  <Step
                    description={`提交审核后会进行初核与复核，由 ${name} 审核，联系电话：${phone}。`}
                  />
                  <Step description={`公示，由 ${name} 执行，联系电话：${phone}。`} />
                  <Step description={`入库，由 ${name} 执行，联系电话：${phone}。`} />
                </ZCYVsteps>
              </div>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}
