import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Breadcrumb,
  Button,
  Table,
  Dropdown,
  Menu,
  Icon,
  Row,
  Modal,
  Form,
  Input
} from 'zcy-antd';
import {
  ZCYContainer,
  ZCYStatus,
  ZCYPanel,
  ZCYDatePicker,
  ZCYTab,
  ZCYUtils
} from 'zcy-common';

import { Link } from 'react-router';
import { AgencyModal, StepTab, AgencyStatus, getPower, AgencySubmit } from 'components-common'
import './index.less';

class AgencyProfessionalList extends Component {

  constructor(props) {
    super(props)
    this.columns = [{
      title: '资质名称',
      dataIndex: 'name',
    }, {
      title: '证件编号',
      dataIndex: 'certCode',
    }, {
      title: '资质等级',
      dataIndex: 'level',
    }, {
      title: '发证机构',
      dataIndex: 'agencyName',
    }, {
      title: '资质有效期',
      dataIndex: 'effectiveBeginTime',
      render: (text) => moment(text).format('YYYY-MM-DD')
    }, {
      title: '操作',
      width: 180,
      fixed: 'right',
      render: (obj, record, index) => {
        return (
          <div>
            <Link className="zcy-mr" to={`/certificate/credit/detail/${obj.id}`}>查看详情</Link>
            <Link className="zcy-mr" to={`/certificate/credit/edit/${obj.id}`}>编辑</Link>
            <a className="zcy-mr" href="javascript:;" onClick={() => this.delete(obj.id)}>删除</a>
          </div>
        )
      }
    }];

    this.state = {
      tableConfig: {
        onChange: this.paginationChange,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        showQuickJumper: true,
        showTotal: this.showTotal
      },
      tableLoading: true,
      modalType: '',
      modalVisible: false,
      onOk: null,
      pageNo: 1,
      pageSize: 10,
      isAudit: getPower.isAudit()
    }
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  componentDidMount() {
    this.getCreditList();
  }

  paginationChange = (pageNo, pageSize) => {
    this.setState({
      pageNo,
      pageSize
    })
    this.getCreditList({
      pageNo,
      pageSize
    })
  }

  onShowSizeChange = (pageNo, pageSize) => {
    this.setState({
      pageNo,
      pageSize
    })
    this.getCreditList({
      pageNo,
      pageSize
    })
  }

  getCreditList = (options) => {
    const { agencyAuditBaseInfo, getCreditList } = this.props;
    this.setState({
      tableLoading: true
    })
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    options = {
      ...options,
      orgId
    }
    getCreditList(options).then(() => {
      this.setState({
        tableLoading: false
      })
    })
  }

  delete = (id) => {
    this.setState({
      modalVisible: true,
      onOk: () => this.handleDelete(id),
      modalType: 'delete'
    })
  }

  handleDelete = (id) => {
    this.props.creditListDelete({
      id,
      pageNo: this.state.pageNo,
      pageSize: this.state.pageSize
    })
  }

  showTotal = (total) => {
    return `共有${total}条数据`
  }

  turnToCreate = () => {
    let router = this.context.router;
    router.push('/certificate/credit/create');
  }

  tabClick = (key) => {
    let router = this.context.router;
    let url = '';
    switch (key) {
      case 'FIRST_ORG': 
        url = '/certificate/base';
        break;
      case 'AGAIN_ORG': 
        url = '/certificate/specific/list';
        break;
      case 'agency_change': 
        url = '/certificate/credit/list';
        break;
    }
    router.push(url);
  }

  render() {
    const { tableList, total } = this.props
    const { tableConfig, tableLoading, modalType, modalVisible, onOk, isAudit} = this.state;
    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit />
          </div>
          <Breadcrumb >
            <Breadcrumb.Item><Link to="/certificate/base">资质信息</Link></Breadcrumb.Item>
            <Breadcrumb.Item><span>信用信息列表</span></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <AgencyModal
            modalType={modalType}
            visible={modalVisible}
            onOk={onOk}
            onCancel={() => this.setState({modalVisible: false})}
            ></AgencyModal>
          <ZCYPanel>
            <ZCYPanel.Header title="资质信息"></ZCYPanel.Header>
            <ZCYPanel.Body>
              <ZCYTab defaultActiveKey="agency_change" onTabClick={this.tabClick}>
                <ZCYTab.Pane tab="基本资质信息" key="FIRST_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="特定资质信息" key="AGAIN_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="信用信息" key="agency_change"></ZCYTab.Pane>
              </ZCYTab>
              {
                !isAudit && (
                  <Row>
                    <Button type="ghost" className="certificate-credit-create-btn" onClick={this.turnToCreate}>新增</Button>
                  </Row>
                )
              }
              <Table
                style={{marginTop: '20px'}}
                columns={this.columns}
                pagination={{
                  total: total,
                  ...tableConfig
                }}
                dataSource={tableList}
                loading={tableLoading}
                bordered
                ></Table>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

export default AgencyProfessionalList;
