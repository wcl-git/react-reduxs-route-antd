import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Row,
  Col,
  Form,
  Dropdown,
  Menu,
  Icon,
  Input,
  Button,
  Table
} from 'zcy-antd'
import { ZCYContainer, ZCYPanel, ZCYForm } from 'zcy-common'
const ZCYFormItem = ZCYForm.Item

class AuditLogging extends Component {
  static contextTypes = {
    router: PropTypes.shape
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '时间',
        dataIndex: 'gmtCreate',
        width: 198,
        render: text => text && moment(text).format('YYYY-MM-DD HH:mm')
      },
      {
        title: '操作人',
        dataIndex: 'approvalUserName',
        width: 138
      },
      {
        title: '所属单位',
        dataIndex: 'approvalSubmitName',
        width: 138
      },
      {
        title: '状态',
        dataIndex: 'approvalState',
        width: 138
      },
      {
        title: '附件',
        dataIndex: '',
        width: 138
      },
      {
        title: '说明',
        dataIndex: 'approvalRemark',
        width: 311
      }
    ]
  }

  componentDidMount() {
    const { params } = this.props

    params.id && this.initLoad(params.id)
  }

  initLoad(id) {
    this.props.loadLoggingInfo(id)
    this.props.LoadPostilInfo(id)
  }

  render() {
    const { getFieldProps } = this.props.form
    const { postil, tableList } = this.props
    const postilList = [postil]

    const menu = (
      <Menu>
        {postilList.map((item, index) => {
          const modifyTime = moment(item.gmtModified).format('YYYY-MM-DD')
          return (
            <Menu.Item
              key={index}
            >{`${modifyTime}: ${item.approvalRemark}`}</Menu.Item>
          )
        })}
      </Menu>
    )

    // const columns = [
    //   // {
    //   //   title: '时间',
    //   //   dataIndex: 'gmtCreate',
    //   //   width: 198,
    //   //   render: text => text && moment(text).format('YYYY-MM-DD HH:mm')
    //   // },
    //   {
    //     title: '时间',
    //     dataIndex: 'gmtCreate',
    //     width: 198,
    //     render(text, record, index) {
    //       let UTCTime = moment(text).format('YYYY-MM-DD HH:mm')
    //       const obj = {
    //         children: UTCTime,
    //         props: {}
    //       }
    //       if (text) {
    //         if (index) {
    //           let value = tableList[index - 1]['gmtCreate']
    //           if (
    //             moment(text).format('YYYY-MM-DD') ==
    //             moment(value).format('YYYY-MM-DD')
    //           ) {
    //             // UTCTime = moment(text).format('HH:mm')
    //             ogj.children = moment(text).format('HH:mm')
    //           }
    //         }
    //       }
    //       return obj
    //     }
    //   },
    //   {
    //     title: '操作人',
    //     dataIndex: 'approvalUserName',
    //     width: 138
    //   },
    //   {
    //     title: '所属单位',
    //     dataIndex: 'approvalSubmitName',
    //     width: 138
    //   },
    //   {
    //     title: '状态',
    //     dataIndex: 'approvalState',
    //     width: 138
    //   },
    //   {
    //     title: '附件',
    //     dataIndex: '',
    //     width: 138
    //   },
    //   {
    //     title: '说明',
    //     dataIndex: 'approvalRemark',
    //     width: 311
    //   }
    // ]
    return (
      <div className="aduit-logging">
        <ZCYContainer>
          <ZCYPanel>
            <ZCYPanel.Header title="记录详情" />
            <ZCYPanel.Body>
              <div style={{ margin: '20px 0' }}>
                <h3>
                  <Icon type="info-circle-o" />基本信息
                </h3>
              </div>
              <ZCYPanel.SubHeader title="机构信息" />
              <Row>
                <Col span={16}>
                  <ZCYForm style={{ width: '610px' }} editEnable={false}>
                    <ZCYFormItem label="机构名称">
                      <Input />
                    </ZCYFormItem>
                    <ZCYFormItem label="机构成立日期">
                      <Input />
                    </ZCYFormItem>
                  </ZCYForm>
                </Col>
                <Col span={8}>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="javascript:;">
                      批注信息 <Icon type="down" />
                    </a>
                  </Dropdown>
                </Col>
              </Row>
              <ZCYPanel.SubHeader title="操作日志" />
              <div className="aduit-logging-table">
                <Table
                  columns={this.columns}
                  dataSource={tableList}
                  bordered
                  pagination={false}
                />
              </div>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

export default Form.create({
  mapPropsToFields(props) {
    // console.log('mapPropsToFields', props)
    return props.formData
  }
})(AuditLogging)
