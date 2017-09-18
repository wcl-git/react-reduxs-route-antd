import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Breadcrumb, Table, message } from 'zcy-antd'
import {
  ZCYContainer,
  ZCYPanel,
  ZCYForm,
  ZCYUpload,
  ZCYValidate,
  ZCYUtils
} from 'zcy-common'
const ZCYFormItem = ZCYForm.Item
import moment from 'moment'
import { Link } from 'react-router'
import {
  AgencyModal,
  StepTab,
  AgencyStatus,
  AgencySubmit,
  getPower
} from 'components-common'

class AgencyInvestorList extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  constructor(props) {
    super(props)
    this.columns = [
      {
        title: '编号',
        dataIndex: 'index',
        fixed: 'left',
        render: (text, record, index) => index + 1
      },
      {
        title: '出资人',
        dataIndex: 'investName'
      },
      {
        title: '出资人类型',
        dataIndex: 'type',
        render: text => {
          switch (text) {
            case '10':
              return '企业法人'
            case '11':
              return '社会团体法人'
            case '12':
              return '事业法人'
            case '13':
              return '国家授权投资机构或部门'
            case '2':
              return '自然人'
            case '14':
              return '合伙企业'
          }
        }
      },
      {
        title: '出资额(万元)',
        dataIndex: 'investAmount',
        render: (text, record, index) => text && +text / 1000000
      },
      {
        title: '出资比例',
        dataIndex: 'investRatio'
      },
      {
        title: '出资时间',
        dataIndex: 'investTime',
        render: text => text && moment(text).format('YYYY-MM-DD')
      },
      {
        title: '操作',
        dataIndex: 'operate',
        render: (text, record, index) => {
          return (
            <div>
              <Link className="zcy-mr" to={`/investor/detail/${record.id}`}>
                查看详情
              </Link>
              <Link className="zcy-mr" to={`/investor/edit/${record.id}`}>
                编辑
              </Link>
              <a
                className="zcy-mr"
                href="javascript:;"
                onClick={() => this.showModal(record.id)}
              >
                删除
              </a>
            </div>
          )
        }
      }
    ]
    this.state = {
      modalVisible: false,
      modalType: '',
      onOk: null,
      deleteId: null,
      tableConfig: {
        onChange: this.paginationChange,
        showSizeChanger: true,
        onShowSizeChange: this.onShowSizeChange,
        showQuickJumper: true,
        showTotal: this.showTotal
      },
      isAudit: getPower.isAudit()
    }
  }

  componentDidMount() {
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    this.initInvestorList({})
    this.props.loadAccessory({
      orgId
    })
  }

  normFile = e => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  handleEdit = () => {
    this.props.toggleFormState(true)
    if (this.state.modalVisible) {
      this.setState({
        modalVisible: false
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!! ', errors)
        message.warning('请完善数据')
        return
      }

      this.setState({
        modalVisible: true,
        modalType: 'save',
        onOk: () => {
          this.onValidateOk(values)
        }
      })
    })
  }

  //保存弹框确认
  onValidateOk = values => {
    this.props.toggleFormState(false)
    //预处理请求参数
    values.attachmentMaps = {
      AGE_BUSINESS_CHANGE_FILE: values.fileList
    }
    delete values.fileList
    console.log('---values---', values) //表单字段对象
    this.props
      .saveFormData(values)
      .then(() => {
        message.success('保存成功')
        this.setState({
          modalVisible: false
        })
        this.props.loadAccessory()
      })
      .catch(e => {
        console.log('axios ', e)
        message.error('保存失败')
        this.setState({
          modalVisible: false
        })
        this.props.loadAccessory()
      })
  }

  //切换页码
  paginationChange = (pageNo, pageSize) => {
    this.initInvestorList({
      pageNo,
      pageSize
    })
  }
  //切换每页条数
  onShowSizeChange = (pageNo, pageSize) => {
    this.initInvestorList({
      pageNo,
      pageSize
    })
  }

  initInvestorList = (params) => {
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    this.props.initInvestorList({
      ...params,
      orgId
    })
  }
  //总条数
  showTotal = total => {
    return `共有${total}条`
  }

  showModal = (id, type = 'delete') => {
    this.setState({
      modalVisible: true,
      modalType: type,
      onOk: () => {
        this.onOkDelete()
      },
      deleteId: id
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  onOkDelete = () => {
    const { deleteId } = this.state
    this.props.removeInvestorItem({ id: deleteId }).then(
      () => {
        message.success('删除成功')
        this.setState({
          modalVisible: false
        })
      },
      e => {
        console.log('axios ', e)
        message.error('删除失败')
        this.setState({
          modalVisible: false
        })
      }
    )
  }

  handleCreate = () => {
    const router = this.context.router
    router.push(`/investor/create`)
  }

  render() {
    const { editEnable, tableList, total, USER } = this.props
    const userId = USER.userId

    const { getFieldProps } = this.props.form
    const { isAudit } = this.state

    //公司章程
    const accessoryProps = getFieldProps('fileList', {
      rules: [...ZCYValidate.required],
      valuePropName: 'fileList',
      normalize: this.normFile
    })

    return (
      <div>
        <div className="clearfix">
          <div className="zcy-mt" style={{ float: 'right' }}>
            <AgencySubmit />
          </div>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]" />
          <StepTab />
          <ZCYPanel>
            <ZCYPanel.Header title="出资信息" />
            <ZCYPanel.Body>
              <ZCYPanel.SubHeader order="1" title="出资情况">
                {
                  !isAudit && (editEnable
                  ? <div>
                      <Button
                        className="zcy-mr"
                        onClick={() => {
                          this.setState({ modalVisible: false })
                          this.props.toggleFormState(false)
                        }}
                      >
                        取消
                      </Button>
                      <Button onClick={this.handleSubmit}>保存</Button>
                    </div>
                  : <Button onClick={this.handleEdit}>编辑</Button>)}
              </ZCYPanel.SubHeader>
              <ZCYForm editEnable={editEnable} auditEnable={false}>
                <ZCYFormItem
                  label={
                    <div
                      style={{
                        height: '44px',
                        lineHeight: '22px',
                        fontSize: '12px',
                        display: 'inline-block'
                      }}
                    >
                      公司章程<br />(或上传验资报告、合伙协议)
                    </div>
                  }
                  className="zcy-form-item-mtext"
                  type="upload"
                  required
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="text"
                    {...accessoryProps}
                  >
                    <Button type="ghost">点击上传</Button>
                  </ZCYUpload>
                </ZCYFormItem>
              </ZCYForm>
              <ZCYPanel.SubHeader order="2" title="出资人情况">
                {
                  !isAudit && (
                    <Button type="primary" onClick={this.handleCreate}>
                      新增
                    </Button>
                  )
                }   
              </ZCYPanel.SubHeader>
              <Table
                columns={this.columns}
                dataSource={tableList}
                bordered
                pagination={{
                  total: total,
                  ...this.state.tableConfig
                }}
              />
              <AgencyModal
                visible={this.state.modalVisible}
                modalType={this.state.modalType}
                onOk={this.state.onOk}
                onCancel={this.hideModal}
              />
              <p style={{ margin: '20px 0 0' }}>
                供应商是企业法人或合伙企业，请在填写出资人信息时注意： 1.
                若除该十大出资人以外仍有非自然人类型的出资人，即企业（含合伙企业）、事业单位、社会团体等，仍应予以列明。 2.
                除此之外，若还存在自然人类型的出资人，在“出资人全称”一栏填写“其他出资人”，“出资额”填写自然人单独或者合计持有供应商股份（或股权，或合伙份额）对应的出资额，“出资比例”
                填写自然人单独或者合计持有供应商的股份（或股权，或合伙份额）比例，“出资时间”填写自然人出资人中最迟的出资时间。
              </p>
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
})(AgencyInvestorList)
