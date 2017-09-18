import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'zcy-antd'
import { ZCYContainer, ZCYPanel } from 'zcy-common'
import ModalFrom from './modal'
import './style.less'
import { browserHistory } from 'react-router'
import { organicAuditOrganicUpdate } from '../services'

export default class AuditAgency extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.init()
  }

  searchSubmit = (err, values) => {
    console.log(err, values)
    const region = values.combineArea.slice(-1).toString()
    organicAuditOrganicUpdate(region)
  }

  render() {
    const { auditAgency, USER, District } = this.props

    const agencyData = auditAgency.agencyData
    const distId = District.code

    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <Button onClick={browserHistory.goBack}>返回</Button>
          </div>
        </div>
        <ZCYContainer>
          <ZCYPanel>
            <ZCYPanel.Header title="审核机构" />
            <ZCYPanel.Body>
              <ZCYPanel.SubHeader title="审批机构" />
              <div className="agency-container">
                <div>
                  <span>
                    审批机构：{agencyData.name}
                  </span>
                  <ModalFrom
                    trigger={
                      <Button type="ghost" size="small" className="change-btn">
                        更改
                      </Button>
                    }
                    modalName="更改"
                    onSubmit={this.searchSubmit}
                    loadAgencyList={this.props.getAuditAgencyList}
                    distId={distId}
                    pageData={auditAgency}
                  />
                </div>
                <div>
                  <span>
                    联系电话：{agencyData.phone}
                  </span>
                </div>
                <div>
                  <span>
                    申请材料寄送地址：{agencyData.data && agencyData.data.address}
                  </span>
                </div>
              </div>
              <ZCYPanel.SubHeader title="监管机构" />
              <div className="agency-container">
                <div>
                  <span>
                    审批机构：{agencyData.name}
                  </span>
                </div>
                <div>
                  <span>
                    联系电话：{agencyData.phone}
                  </span>
                </div>
                <div>
                  <span>
                    申请材料寄送地址：{agencyData.data && agencyData.data.address}
                  </span>
                </div>
              </div>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}
