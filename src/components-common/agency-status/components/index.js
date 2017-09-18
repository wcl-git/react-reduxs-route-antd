import React, { Component } from 'react'
import { ZCYStatus, ZCYUtils } from 'zcy-common'
import { Link } from 'react-router'
import AgencyCirculationLog from 'components-common/circulation-log'
import AgencyPrint from 'components-common/agency-print'
import getPower from '../../agency-power'

export default class AgencyStatus extends Component {
  state = {
    stateType: {
      FIRST_ORG: {
        text: '待初核',
        color: 'primary'
      },
      AGAIN_ORG: {
        text: '待复核',
        color: 'primary'
      },
      NOTICE_WAIT_ORG: {
        text: '待公示',
        color: 'primary'
      },
      NOTICE_ING_ORG: {
        text: '公示中',
        color: 'purple'
      },
      NOTICE_AGAIN_PUBLIC_ORG: {
        text: '公示未通过',
        color: 'error'
      },
      TEMP_ORG: {
        text: '待入库',
        color: 'primary'
      },
      WAIT_SUBMMIT: {
        text: '待提交',
        color: 'primary'
      }
    },
    logVisible: false
  }

  componentDidMount() {
    const { agencyAuditBaseInfo } = this.props;
    let isAudit = getPower.isAudit();
    if (agencyAuditBaseInfo.isAudit !== undefined) {
      isAudit = agencyAuditBaseInfo.isAudit
    }
    if (!isAudit) {
      this.props.getAgencyAuditStatus()
    }
  }

  getAgencyCirculationLog = () => {
    this.props.getAgencyCirculationLog().then(() => {
      this.setState({
        logVisible: true
      })
    })
  }

  render() {
    let { agencyAuditStatus, statusTip, USER, agencyAuditBaseInfo } = this.props;
    let statusObj = this.state.stateType[agencyAuditStatus.state]
    !statusObj && (statusObj = {})
    let isAudit = getPower.isAudit();
    if (agencyAuditBaseInfo.isAudit !== undefined) {
      isAudit = agencyAuditBaseInfo.isAudit
    }
    return !isAudit && (
      <ZCYStatus
        status={statusObj.text}
        statusTip={statusTip}
        textColor={statusObj.color}
      >
        <Link to="/auditExplain">审核说明</Link>
        <Link to="/auditAgency">审核机构</Link>
        <div style={{ display: 'inline-block' }}>
          <AgencyPrint />
        </div>
        <a onClick={this.getAgencyCirculationLog}>审核记录</a>
        <AgencyCirculationLog
          logShowModal={true}
          logVisible={this.state.logVisible}
        />
      </ZCYStatus>
    )
  }
}
