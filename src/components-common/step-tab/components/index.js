import React, {Component} from 'react';
import { ZCYStepTab, ZCYUtils } from 'zcy-common';
import getPower from '../../agency-power'

export default class StepTab extends Component {
  componentDidMount() {
    const { agencyAuditBaseInfo } = this.props;
    let isAudit = getPower.isAudit();
    if (agencyAuditBaseInfo.isAudit !== undefined) {
      isAudit = agencyAuditBaseInfo.isAudit
    }
    if (!isAudit) {
      this.props.getInitTabProgress()
    }
  }

  render() {
    let { tabProgress, USER, agencyAuditBaseInfo } = this.props;
    let isAudit = getPower.isAudit();
    let auditId = getPower.auditId()
    let orgId = getPower.orgId()
    let state = getPower.state()
    if (agencyAuditBaseInfo.isAudit !== undefined) {
      isAudit = agencyAuditBaseInfo.isAudit
    }
    return (
      <ZCYStepTab>
        <ZCYStepTab.Item to={isAudit ? `/organic/audit/${auditId}/${orgId}/${state}` : "/organic/detail"} onlyTitle={isAudit} group="organic" status={tabProgress.organic}>基本信息</ZCYStepTab.Item>
        <ZCYStepTab.Item to="/certificate/base" onlyTitle={isAudit} group="certificate" status={tabProgress.certificate}>资质信息</ZCYStepTab.Item>
        <ZCYStepTab.Item to="/investor/list" onlyTitle={isAudit} group="investor" status={tabProgress.investor}>出资信息</ZCYStepTab.Item>
        <ZCYStepTab.Item to="/financial/list" onlyTitle={isAudit} group="financial" status={tabProgress.finance}>财务信息</ZCYStepTab.Item>
        <ZCYStepTab.Item to="/keyPersonnel/detail" onlyTitle={isAudit} group="keyPersonnel" status={tabProgress.employee}>主要人员</ZCYStepTab.Item>
        <ZCYStepTab.Item to="/professional/list" onlyTitle={isAudit} group="professional" status={tabProgress.professional}>专职人员</ZCYStepTab.Item>
        <ZCYStepTab.Item to="/achievement/list" onlyTitle={isAudit} group="achievement" status={tabProgress.performance}>业绩信息</ZCYStepTab.Item>
        <ZCYStepTab.Item to="/bidding/list" onlyTitle={isAudit} group="bidding" status={tabProgress.bidding}>场地信息</ZCYStepTab.Item>
        {
          USER.categoryName && USER.categoryName.startsWith('06') && (
            <ZCYStepTab.Item to="/branch/list" onlyTitle={isAudit} group="branch" status={tabProgress.bidding}>分支机构</ZCYStepTab.Item>
          )
        }
      </ZCYStepTab>
    )
  }
}