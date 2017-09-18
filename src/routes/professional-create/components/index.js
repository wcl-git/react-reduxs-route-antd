import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types'
import { 
  Breadcrumb, 
  Button, 
  Table,
  Row,
  message
} from 'zcy-antd'
import { 
  ZCYContainer,  
  ZCYPanel, 
  ZCYSearch
} from 'zcy-common'
import { Link } from 'react-router';
import { StepTab, AgencyStatus, AgencySubmit } from 'components-common'
import './index.less';

class AgencyProfessional extends Component {

  constructor(props) {
    super(props)
    this.columns = [{
      title: '姓名',
      dataIndex: 'user.displayName'
    }, {
      title: '性别',
      dataIndex: 'sex',
      render: (text) => {
        return text === 0 ? '男' : '女'
      },
    }, {
      title: '所属部门',
      dataIndex: 'employee.depName',
    }, {
      title: '职务',
      dataIndex: 'employee.job',
    },{
      title: '联系电话',
      dataIndex: 'user.mobile',
    }];
    this.state = {
      userIds: [],
      tableConfig: {
        onChange: this.paginationChange,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        showQuickJumper: true,
        showTotal: this.showTotal
      },
      pageNo: 1,
      pageSize: 10,
      searchName: null,
      tableLoading: true,
      addBtnLoading: false
    }
  }

  componentDidMount() {
    const { getAgencyCirculationLog } = this.props;
    this.getProfessionalUserList();
  }

  paginationChange = (pageNo, pageSize) => {
    this.setState({
      pageNo
    })
    this.getProfessionalUserList({
      pageNo,
      pageSize,
      name: this.state.searchName
    })
  }

  onShowSizeChange = (pageNo, pageSize) => {
    this.setState({
      pageSize
    })
    this.getProfessionalUserList({
      pageNo,
      pageSize,
      name: this.state.searchName
    })
  }

  getProfessionalUserList = (params) => {
    const { getProfessionalUserList } = this.props;
    this.setState({
      tableLoading: true
    })
    return getProfessionalUserList({
      ...params
    }).then(() => {
      this.setState({
        tableLoading: false
      })
    })
  }

  showTotal = (total) => {
    return `共有${total}条数据`
  }

  onSelectChange = (selectedRowKeys, selectedRowData) => {
    let userIds = selectedRowData.map((obj) => {
      return obj.user.id
    })
    this.setState({
      userIds
    })
  }

  addProfessional = () => {
    const { addProfessional } = this.props;
    const { userIds, pageSize } = this.state
    this.setState({
      addBtnLoading: true,
    })
    addProfessional({
      userIds,
      pageSize
    }).then(() => {
      
      message.success('新增专职人员成功');
      this.setState({
        pageNo: 1,
        addBtnLoading: false
      })
      return this.getProfessionalUserList({
        pageSize
      })
    })
  }

  onSearch = (name) => {
    this.getProfessionalUserList({
      name
    }).then(() => {
      this.setState({
        pageNo: 1,
        searchName: name
      })
    })
  }

  render() {

    const { professionalUserList, total } = this.props
    const { tableLoading } = this.state
    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit></AgencySubmit>
          </div>
          <Breadcrumb >
            <Breadcrumb.Item><Link to="/professional/list">专职人员</Link></Breadcrumb.Item>
            <Breadcrumb.Item><span>专职人员新增</span></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <ZCYPanel>
            <ZCYPanel.Header title="专职人员">
              <Button onClick={this.addProfessional} loading={this.state.addBtnLoading}>新增</Button>
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <Row>
                <ZCYSearch
                placeholder="请输入姓名"
                onSearch={this.onSearch}
                style={{float: 'right', marginBottom: '20px'}}
                ></ZCYSearch>
              </Row>
              <Table
                rowSelection={{
                  onChange: this.onSelectChange,
                }}
                columns={this.columns} 
                pagination={{
                  total: total,
                  current: this.state.pageNo,
                  ...this.state.tableConfig
                }}
                dataSource={professionalUserList}
                loading={tableLoading}
                bordered></Table>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
      
    )
  }
}

export default AgencyProfessional
