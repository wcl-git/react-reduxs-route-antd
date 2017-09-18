import React, {Component} from 'react';
import moment from 'moment';
import { 
  Table,
  Modal
} from 'zcy-antd';
import { Link } from 'react-router';
import './index.less'

export default class AgencyCirculationLog extends Component {
  state = {
    columns: [{
      title: '时间',
      dataIndex: 'approvalTime',
      render: (text) => text && moment(text).format('YYYY-MM-DD HH:mm:ss'),
      width: 200,
    }, {
      title: '操作人',
      dataIndex: 'approvalUserName',
      width: 150,
    }, {
      title: '所属单位',
      dataIndex: 'employee.depName',
      width: 100,
    }, {
      title: '操作项',
      dataIndex: 'approvalState',
      width: 100,
    }, {
      title: '操作说明',
      dataIndex: 'approvalRemark',
    }],
    visible: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logVisible) {
      this.setState({
        visible: nextProps.logVisible
      })
    }
  }

  onCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { columns, visible } = this.state;
    const { agencyCirculationLog, logShowModal } = this.props;

    let table = (
      <Table
        rowClassName={() => "circulation-log-row"}
        columns={columns}
        pagination={false}
        scroll={{y: 300}}
        dataSource={agencyCirculationLog}
        bordered
      ></Table>
    );
    return (
      logShowModal ? (
        <Modal
          title="流转日志"
          onCancel={this.onCancel}
          visible={visible}
          footer={null}
          width={1000}
          >
          { table }
        </Modal>
      ) : table
    )
  }
}