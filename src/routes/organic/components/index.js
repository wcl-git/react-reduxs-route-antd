import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Row,
  Col,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Radio,
  DatePicker,
  message,
  TreeSelect,
  Upload
} from 'zcy-antd'
import {
  ZCYContainer,
  ZCYStatus,
  ZCYStepTab,
  ZCYPanel,
  ZCYForm,
  ZCYValidate,
  ZCYUpload,
  Address,
  ZCYUtils
} from 'zcy-common'
import './style.less'
const RadioGroup = Radio.Group
const ZCYFormItem = ZCYForm.Item
import {
  AgencyModal,
  StepTab,
  AgencyStatus,
  AgencySubmit,
  getPower
} from 'components-common'
import treeData from './treeConf'
import { contactsSave, contactsDelete } from '../services'

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function avatarBeforeUpload(file) {
  const acceptMIME = ['image/jpeg', 'image/jpg', 'image/png']
  const isSuit = acceptMIME.includes(file.type)

  if (!isSuit) {
    message.error('上传图片仅支持 jpg png 格式!')
  }
  const isLt20M = file.size / 1024 / 1024 < 20
  if (!isLt20M) {
    message.error('图片大小必须小于 20MB!')
  }
  return isSuit && isLt20M
}

function fileBeforeUpload(file) {
  const acceptMIME = [
    'application/pdf',
    'application/x-pdf',
    'application/msword',
    'application/vnd.ms-excel'
  ]
  const isSuit = acceptMIME.includes(file.type)

  if (!isSuit) {
    message.error('上传文件仅支持 word, excel, pdf 格式!')
  }
  const isLt20M = file.size / 1024 / 1024 < 20
  if (!isLt20M) {
    message.error('文件大小必须小于 20MB!')
  }
  debugger
  return isSuit && isLt20M
}

class Organic extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      modalType: '',
      onOk: null,
      imageUrl: '',
      contactorNum: 1,
      contacter2Visible: false,
      contacter3Visible: false
    }
  }

  componentDidMount() {
    const { routeParams, auditEnable } = this.props;
    let id = routeParams.id;
    let orgId = routeParams.orgId;
    let state = routeParams.state;
    let visible = routeParams.visible;
    if (auditEnable) {
      this.props.getAgencyAuditInfo({
        key: 'organic',
        approvalId: id
      })
      ZCYUtils.setCookie('auditId', id)
      ZCYUtils.setCookie('orgId', orgId)
      ZCYUtils.setCookie('state', state)
      if (visible) {
        ZCYUtils.setCookie('auditPopVisible', false)
      } else {
        ZCYUtils.setCookie('auditPopVisible', true)
      }
    } else {
      ZCYUtils.setCookie('auditId', '')
      ZCYUtils.setCookie('orgId', '')
      ZCYUtils.setCookie('state', '')
      ZCYUtils.setCookie('auditPopVisible', true)
    }
    this.props.loadAgencyInfo({
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
        console.log('error---values---', values)
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
    const { params } = this.props
    //不传id为新增,传递id为编辑
    params.id && (values.id = params.id)
    //区划
    values.bizProv = values.combineArea[0]
    values.bizCity = values.combineArea[1]
    values.bizDist = values.combineArea[2]
    delete values.combineArea

    values['inceptionDate'] = +values['inceptionDate']

    values.attachmentMaps = {
      //代理机构头像
      AGE_ORG_PHOTO: values.AGE_ORG_PHOTO,
      //机构彩页
      AGE_COMPANY_BROCHURE: values.AGE_COMPANY_BROCHURE,
      //上年度或本年度财务报告
      AGE_ORG_YEARFINANCEREPORT_FILE: values.AGE_ORG_YEARFINANCEREPORT_FILE,
      //依法缴纳社会保证金证明
      AGE_ORG_PROOFSECURITY_FILE: values.AGE_ORG_PROOFSECURITY_FILE,
      //内部机构设置
      AGE_ORG_INSIDEORGANIZATION_FILE: values.AGE_ORG_INSIDEORGANIZATION_FILE,
      //机构章程
      AGE_ORG_CONSTITUTION_FILE: values.AGE_ORG_CONSTITUTION_FILE,
      //机构内部认识财务和业务管理制度说明
      AGE_ORG_BUSINESS_FILE: values.AGE_ORG_BUSINESS_FILE,
      //人事档案管理代理证明
      AGE_ORG_PERSONNEL_FILE: values.AGE_ORG_PERSONNEL_FILE
    }

    delete values.AGE_ORG_PHOTO
    delete values.AGE_COMPANY_BROCHURE
    delete values.AGE_ORG_YEARFINANCEREPORT_FILE
    delete values.AGE_ORG_PROOFSECURITY_FILE
    delete values.AGE_ORG_INSIDEORGANIZATION_FILE
    delete values.AGE_ORG_CONSTITUTION_FILE
    delete values.AGE_ORG_BUSINESS_FILE
    delete values.AGE_ORG_PERSONNEL_FILE

    if (values.AGE_ORG_CHANGE_COMPANY_FIEL) {
      //变更申请书
      values.attachmentMaps.AGE_ORG_CHANGE_COMPANY_FIEL =
        values.AGE_ORG_CHANGE_COMPANY_FIEL
      //变更依据
      values.attachmentMaps.AGE_ORG_CHANGE_ACCORDING_FILE =
        values.AGE_ORG_CHANGE_ACCORDING_FILE

      delete values.AGE_ORG_CHANGE_COMPANY_FIEL
      delete values.AGE_ORG_CHANGE_ACCORDING_FILE
    }

    console.log('ok---values---', values) //表单字段对象
    // if (values.contactName && values.contactPhone && values.officePhone) {
    //   contactsSave({
    //     contactName: values.contactName,
    //     contactPhone: values.contactPhone,
    //     officePhone: values.officePhone,
    //     position: 1
    //   }).then(() => {
    //     console.info('联系人保存成功')
    //   })
    // }
    // if (
    //   values.contactTwoName &&
    //   values.contactTwoPhone &&
    //   values.officeTwoPhone
    // ) {
    //   contactsSave({
    //     contactName: values.contactTwoName,
    //     contactPhone: values.contactTwoPhone,
    //     officePhone: values.officeTwoPhone,
    //     position: 2
    //   }).then(() => {
    //     console.info('联系人2保存成功')
    //   })
    // }
    // if (
    //   values.contactThreeName &&
    //   values.contactThreePhone &&
    //   values.officeThreePhone
    // ) {
    //   contactsSave({
    //     contactName: values.contactThreeName,
    //     contactPhone: values.contactThreePhone,
    //     officePhone: values.officeThreePhone,
    //     position: 3
    //   }).then(() => {
    //     console.info('联系人3保存成功')
    //   })
    // }

    this.props
      .saveAgencyOrganic(values)
      .then(() => {
        message.success('保存成功')
        this.setState({
          modalVisible: false
        })
        //FormItem 会清空数据
        this.props.toggleFormState(false)
      })
      .catch(e => {
        console.log('axios ', e)
        message.error('保存失败')
        this.setState({
          modalVisible: false
        })
      })
  }

  handleCancel = () => {
    this.setState({
      modalVisible: true,
      modalType: 'cancel',
      onOk: () => {
        this.context.router.push(`/organic/detail`)
      }
    })
  }

  // 新增联系人
  handleAddContacts = () => {
    const { contactorNum, contacter2Visible, contacter3Visible } = this.state
    if (contactorNum == 1) {
      if (!contacter2Visible) {
        this.setState({
          contacter2Visible: true,
          contactorNum: 2
        })
        return
      }
      if (!contacter3Visible) {
        this.setState({
          contacter3Visible: true,
          contactorNum: 2
        })
        return
      }
    }
    if (contactorNum == 2) {
      if (!contacter2Visible) {
        this.setState({
          contacter2Visible: true,
          contactorNum: 3
        })
        return
      }
      if (!contacter3Visible) {
        this.setState({
          contacter3Visible: true,
          contactorNum: 3
        })
        return
      }
    }
  }

  //删除联系人
  contacter2Remove = () => {
    let { contactorNum } = this.state
    this.setState({
      modalVisible: true,
      modalType: 'delete',
      onOk: () => {
        this.setState({
          modalVisible: false,
          contacter2Visible: false,
          contactorNum: contactorNum - 1
        })
        // contactsDelete(2).then(() => {
        //   this.setState({
        //     modalVisible: false,
        //     contacter2Visible: false,
        //     contactorNum: contactorNum - 1
        //   })
        //   console.log('联系人2删除成功')
        // })
      }
    })
  }
  contacter3Remove = () => {
    let { contactorNum } = this.state
    this.setState({
      modalVisible: true,
      modalType: 'delete',
      onOk: () => {
        this.setState({
          modalVisible: false,
          contacter3Visible: false,
          contactorNum: contactorNum - 1
        })
        // contactsDelete(3).then(() => {
        //   this.setState({
        //     modalVisible: false,
        //     contacter3Visible: false,
        //     contactorNum: contactorNum - 1
        //   })
        //   console.log('联系人3删除成功')
        // })
      }
    })
  }

  handleAvatarChange = info => {
    if (info.file && info.file.status === 'done') {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({ imageUrl })
      )
    }
  }

  // componentWillReceiveProps(nextProps, state) {
  //   if (nextProps.formData.AGE_ORG_PHOTO.value.length) {
  //     const order = nextProps.formData.AGE_ORG_PHOTO.value.length - 1
  //     const photoItem = nextProps.formData.AGE_ORG_PHOTO.value[order]
  //     let imageUrl = ''
  //     photoItem.url
  //       ? (imageUrl = photoItem.url)
  //       : (imageUrl = photoItem.thumbUrl)
  //     // console.log(photoItem)
  //     this.setState({
  //       imageUrl: imageUrl
  //     })
  //   }
  //   debugger
  //   if (nextProps.formData.contactTwoName.value) {
  //     this.setState({
  //       contacter2Visible: true
  //     })
  //   }
  //   if (nextProps.formData.contactThreeName.value) {
  //     this.setState({
  //       contacter3Visible: true
  //     })
  //   }
  // }

  render() {
    const { editEnable, auditEnable, USER, changeFullName } = this.props
    const userId = USER.userId

    const {
      imageUrl,
      contactorNum,
      contacter2Visible,
      contacter3Visible
    } = this.state

    const { getFieldProps } = this.props.form
    let isAudit = getPower.isAudit();
    //机构隶属关系
    const membershipProps = getFieldProps('subordination', {
      rules: [...ZCYValidate.required]
    })
    //机构名称
    const fullNameProps = getFieldProps('fullName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(100)]
    })
    //通用简称
    const commonShortNameProps = getFieldProps('shortName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(10)]
    })
    // 经济性质
    const economicTypeProps = getFieldProps('economicType', {
      rules: [...ZCYValidate.required]
    })
    //机构成立日期
    const foundDateProps = getFieldProps('inceptionDate', {
      rules: [
        ...ZCYValidate.required,
        {
          validator: function(rule, value, callback) {
            if (+value && +value > +new Date()) {
              callback(new Error('机构成立日期不能大于当前日期!'))
            } else {
              callback()
            }
          }
        }
      ]
    })
    //邮编
    const postCodeProps = getFieldProps('postCode', {
      rules: [...ZCYValidate.required, ...ZCYValidate.postCode]
    })
    //机构邮箱
    const emailProps = getFieldProps('email', {
      rules: [...ZCYValidate.required, ...ZCYValidate.email]
    })

    //对外联系人
    const contactNameProps = getFieldProps('contactName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(10)]
    })
    //手机号码
    const contactPhoneProps = getFieldProps('contactPhone', {
      rules: [...ZCYValidate.required, ...ZCYValidate.mobile]
    })
    //办公室电话
    const officePhoneProps = getFieldProps('officePhone', {
      rules: [...ZCYValidate.required, ...ZCYValidate.telephone]
    })

    //开户银行名称
    const depositBankProps = getFieldProps('depositBank', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(50)]
    })
    //开户银行账号
    const bankAccountProps = getFieldProps('bankAccount', {
      rules: [
        ...ZCYValidate.required,
        ...ZCYValidate.number,
        { mix: 16, max: 19, message: '银行账号最多19位' }
      ]
    })
    //代理机构头像
    const agencyAvatarProps = getFieldProps('AGE_ORG_PHOTO', {
      valuePropName: 'fileList',
      normalize: this.normFile
    })
    //机构彩页
    const agencyPageProps = getFieldProps('AGE_COMPANY_BROCHURE', {
      valuePropName: 'fileList',
      normalize: this.normFile
    })
    //上年度或本年度财务报告
    const financialReportProps = getFieldProps(
      'AGE_ORG_YEARFINANCEREPORT_FILE',
      {
        valuePropName: 'fileList',
        normalize: this.normFile
      }
    )
    //依法缴纳社会保证金证明
    const socialSecurityProps = getFieldProps('AGE_ORG_PROOFSECURITY_FILE', {
      valuePropName: 'fileList',
      normalize: this.normFile
    })
    //内部机构设置
    const internalOrgProps = getFieldProps('AGE_ORG_INSIDEORGANIZATION_FILE', {
      valuePropName: 'fileList',
      normalize: this.normFile
    })
    //机构章程
    const orgRulesProps = getFieldProps('AGE_ORG_CONSTITUTION_FILE', {
      valuePropName: 'fileList',
      normalize: this.normFile
    })
    //机构内部认识财务和业务管理制度说明
    const orgBusinessProps = getFieldProps('AGE_ORG_BUSINESS_FILE', {
      valuePropName: 'fileList',
      normalize: this.normFile
    })
    //人事档案管理代理证明
    const personnelFilesProps = getFieldProps('AGE_ORG_PERSONNEL_FILE', {
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
          <ZCYForm editEnable={editEnable} auditEnable={auditEnable} auditType={`organic`}>
            <ZCYPanel>
              <AgencyModal
                visible={this.state.modalVisible}
                modalType={this.state.modalType}
                onOk={this.state.onOk}
                onCancel={() => {
                  this.setState({ modalVisible: false })
                }}
              />
              <ZCYPanel.Header title="基本信息">
                {!isAudit && (editEnable
                  ? <div>
                      <span className="zcy-mr">
                        <Icon
                          type="info-circle-o"
                          style={{ marginRight: '5px' }}
                        />填写说明
                      </span>
                      <Button className="zcy-mr" onClick={this.handleCancel}>
                        取消
                      </Button>
                      <Button onClick={this.handleSubmit}>保存</Button>
                    </div>
                  : <Button onClick={this.handleEdit}>编辑</Button>)}
              </ZCYPanel.Header>
              <ZCYPanel.Body>
                <div className="agency-info">
                  <ZCYPanel.SubHeader title="机构信息" />
                  <Row>
                    <Col span={20}>
                      <ZCYFormItem
                        label="机构隶属关系"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        required
                      >
                        <RadioGroup {...membershipProps}>
                          <Radio key="sub_company" value="sub_company">
                            分公司
                          </Radio>
                          <Radio key="son_comapny" value="son_comapny">
                            子公司
                          </Radio>
                          <Radio key="office" value="office">
                            办事处
                          </Radio>
                          <Radio key="other" value="other">
                            其他
                          </Radio>
                        </RadioGroup>
                      </ZCYFormItem>
                      <ZCYFormItem
                        label="机构名称"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                        required
                      >
                        <Input placeholder="请输入机构名称" {...fullNameProps} />
                      </ZCYFormItem>
                      <ZCYFormItem
                        label="曾用名"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                      >
                        <Input
                          {...getFieldProps('usedName', {
                            rules: [...ZCYValidate.text(100)]
                          })}
                        />
                      </ZCYFormItem>
                      <ZCYFormItem
                        label="通用简称"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        hasFeedback
                        required
                      >
                        <Input
                          placeholder="请输入通用简称"
                          {...commonShortNameProps}
                        />
                      </ZCYFormItem>
                    </Col>
                    <Col span={4}>
                      <Row type="flex" align="align" justify="center">
                        {/* <ZCYUpload
                          className="avatar-uploader"
                          bizCode="1099"
                          userId={`${userId}`}
                          showUploadList={false}
                          {...agencyAvatarProps}
                        >
                          <span>
                            <Icon
                              type="plus"
                              className="avatar-uploader-trigger"
                            />
                            <div className="avatar-uploader-tip">
                              图片大小不超过20M,支持png、jpg格式
                            </div>
                          </span>
                        </ZCYUpload> */}
                        {/* onChange={this.handleAvatarChange} */}
                        <ZCYUpload
                          className="avatar-uploader"
                          bizCode="1099"
                          userId={`${userId}`}
                          showUploadList={false}
                          showOnly={!editEnable}
                          {...agencyAvatarProps}
                        >
                          {imageUrl
                            ? <img
                                src={imageUrl}
                                alt="avatar"
                                className="avatar"
                              />
                            : <span>
                                <Icon
                                  type="plus"
                                  className="avatar-uploader-trigger"
                                />
                                <div className="avatar-uploader-tip">
                                  图片大小不超过20M,支持png、jpg格式
                                </div>
                              </span>}
                        </ZCYUpload>
                      </Row>
                    </Col>
                  </Row>
                  <ZCYFormItem label="经济性质" required>
                    <TreeSelect
                      style={{ width: 300 }}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={treeData}
                      placeholder="请选择经济性质"
                      treeDefaultExpandAll={false}
                      {...economicTypeProps}
                    />
                  </ZCYFormItem>
                  <ZCYFormItem label="机构成立日期" required type="date">
                    <DatePicker placeholder="请选择成立日期" {...foundDateProps} />
                  </ZCYFormItem>
                  <ZCYFormItem label="机构地址" type="address" required>
                    <Address type="address" {...getFieldProps('combineArea')} />
                    <Input
                      {...getFieldProps('bizAddress')}
                      style={{ marginLeft: 10 }}
                    />
                  </ZCYFormItem>
                  <ZCYFormItem label="邮编" hasFeedback required>
                    <Input placeholder="请输入邮编" {...postCodeProps} />
                  </ZCYFormItem>
                  <ZCYFormItem label="机构邮箱" hasFeedback required>
                    <Input type="email" placeholder="请输入机构邮箱" {...emailProps} />
                  </ZCYFormItem>
                  <ZCYFormItem label="机构传真号码">
                    <Input {...getFieldProps('faxNumber')} />
                  </ZCYFormItem>
                  <ZCYFormItem label="机构网站">
                    <Input {...getFieldProps('webSite')} />
                  </ZCYFormItem>
                  <ZCYFormItem label="简介">
                    <Input
                      {...getFieldProps('remark')}
                      type="textarea"
                      placeholder="信息简介..."
                      style={{ width: 360, height: 50 }}
                    />
                  </ZCYFormItem>
                </div>
                <div className="contact-info">
                  <ZCYPanel.SubHeader title="联系人信息">
                    {editEnable && contactorNum != 3
                      ? <Button type="primary" onClick={this.handleAddContacts}>
                          新增
                        </Button>
                      : null}
                  </ZCYPanel.SubHeader>
                  <div className="contact-item">
                    <ZCYFormItem label="对外联系人" hasFeedback required>
                      <Input placeholder="请输入对外联系人" {...contactNameProps} />
                    </ZCYFormItem>
                    <ZCYFormItem label="手机号码" hasFeedback required>
                      <Input placeholder="请输入手机号码" {...contactPhoneProps} />
                    </ZCYFormItem>
                    <ZCYFormItem label="办公室电话" hasFeedback required>
                      <Input {...officePhoneProps} />
                    </ZCYFormItem>
                  </div>
                  {contacter2Visible
                    ? <div className="contact-item">
                        <ZCYPanel.SubHeader title="&nbsp;">
                          {editEnable
                            ? <Button onClick={this.contacter2Remove}>
                                删除
                              </Button>
                            : null}
                        </ZCYPanel.SubHeader>
                        <ZCYFormItem label="对外联系人2" hasFeedback>
                          <Input
                            placeholder="请输入对外联系人"
                            {...getFieldProps('contactTwoName', {
                              rules: [
                                ...ZCYValidate.required,
                                ...ZCYValidate.text(10)
                              ]
                            })}
                          />
                        </ZCYFormItem>
                        <ZCYFormItem label="手机号码2" hasFeedback>
                          <Input
                            placeholder="请输入手机号码"
                            {...getFieldProps('contactTwoPhone', {
                              rules: [
                                ...ZCYValidate.required,
                                ...ZCYValidate.mobile
                              ]
                            })}
                          />
                        </ZCYFormItem>
                        <ZCYFormItem label="办公室电话2" hasFeedback>
                          <Input
                            {...getFieldProps('officeTwoPhone', {
                              rules: [
                                ...ZCYValidate.required,
                                ...ZCYValidate.telephone
                              ]
                            })}
                          />
                        </ZCYFormItem>
                      </div>
                    : null}
                  {contacter3Visible
                    ? <div className="contact-item">
                        <ZCYPanel.SubHeader title="&nbsp;">
                          {editEnable
                            ? <Button onClick={this.contacter3Remove}>
                                删除
                              </Button>
                            : null}
                        </ZCYPanel.SubHeader>
                        <ZCYFormItem label="对外联系人3" hasFeedback>
                          <Input
                            placeholder="请输入对外联系人"
                            {...getFieldProps('contactThreeName', {
                              rules: [
                                ...ZCYValidate.required,
                                ...ZCYValidate.text(10)
                              ]
                            })}
                          />
                        </ZCYFormItem>
                        <ZCYFormItem label="手机号码3" hasFeedback>
                          <Input
                            placeholder="请输入手机号码"
                            {...getFieldProps('contactThreePhone', {
                              rules: [
                                ...ZCYValidate.required,
                                ...ZCYValidate.mobile
                              ]
                            })}
                          />
                        </ZCYFormItem>
                        <ZCYFormItem label="办公室电话3" hasFeedback>
                          <Input
                            {...getFieldProps('officeThreePhone', {
                              rules: [
                                ...ZCYValidate.required,
                                ...ZCYValidate.telephone
                              ]
                            })}
                          />
                        </ZCYFormItem>
                      </div>
                    : null}
                </div>
                <div className="other-info">
                  <ZCYPanel.SubHeader title="其它信息" />
                  <ZCYFormItem label="开户银行名称" hasFeedback required>
                    <Input placeholder="请输入开户银行名称" {...depositBankProps} />
                  </ZCYFormItem>
                  <ZCYFormItem label="开户银行账号" hasFeedback required>
                    <Input placeholder="请输入开户银行账号" {...bankAccountProps} />
                  </ZCYFormItem>
                  <ZCYFormItem label="是否依法纳税">
                    <RadioGroup {...getFieldProps('isTaxation')}>
                      <Radio key="1" value={1}>
                        是
                      </Radio>
                      <Radio key="0" value={0}>
                        否
                      </Radio>
                    </RadioGroup>
                  </ZCYFormItem>
                  <ZCYFormItem label="是否缴纳社会保证金">
                    <RadioGroup {...getFieldProps('isPaySecurity')}>
                      <Radio key="1" value={1}>
                        是
                      </Radio>
                      <Radio key="0" value={0}>
                        否
                      </Radio>
                    </RadioGroup>
                  </ZCYFormItem>
                  <ZCYFormItem label="近三年有无重大违法记录">
                    <RadioGroup {...getFieldProps('isInfraction')}>
                      <Radio key="1" value={1}>
                        有
                      </Radio>
                      <Radio key="0" value={0}>
                        无
                      </Radio>
                    </RadioGroup>
                  </ZCYFormItem>
                </div>
                <div className="accessory">
                  <ZCYPanel.SubHeader title="附件" />
                  <ZCYFormItem
                    label="机构彩页"
                    className="zcy-form-item-mtext"
                    type="upload"
                  >
                    <ZCYUpload
                      bizCode="1099"
                      userId={`${userId}`}
                      listType="picture"
                      beforeUpload={avatarBeforeUpload}
                      {...agencyPageProps}
                    >
                      <Button type="ghost">点击上传</Button>
                      <span style={{ marginLeft: 10 }}>
                        公司宣传单大小不超过20M, 支持png、jpg格式
                      </span>
                    </ZCYUpload>
                  </ZCYFormItem>
                  <ZCYFormItem
                    label="上年度或本年度财务报告"
                    className="zcy-form-item-mtext"
                    type="upload"
                  >
                    <ZCYUpload
                      bizCode="1099"
                      userId={`${userId}`}
                      listType="text"
                      beforeUpload={fileBeforeUpload}
                      {...financialReportProps}
                    >
                      <Button type="ghost">点击上传</Button>
                      <span style={{ marginLeft: 10 }}>
                        附件大小不超过20M, 支持word、excel、pdf格式
                      </span>
                    </ZCYUpload>
                  </ZCYFormItem>
                  <ZCYFormItem
                    label="依法缴纳社会保证金证明"
                    className="zcy-form-item-mtext"
                    type="upload"
                  >
                    <ZCYUpload
                      bizCode="1099"
                      userId={`${userId}`}
                      listType="text"
                      {...socialSecurityProps}
                    >
                      <Button type="ghost">点击上传</Button>
                    </ZCYUpload>
                  </ZCYFormItem>
                  <ZCYFormItem
                    label="内部机构设置"
                    className="zcy-form-item-mtext"
                    type="upload"
                  >
                    <ZCYUpload
                      bizCode="1099"
                      userId={`${userId}`}
                      listType="text"
                      {...internalOrgProps}
                    >
                      <Button type="ghost">点击上传</Button>
                    </ZCYUpload>
                  </ZCYFormItem>
                  <ZCYFormItem
                    label="机构章程"
                    className="zcy-form-item-mtext"
                    type="upload"
                  >
                    <ZCYUpload
                      bizCode="1099"
                      userId={`${userId}`}
                      listType="text"
                      {...orgRulesProps}
                    >
                      <Button type="ghost">点击上传</Button>
                    </ZCYUpload>
                  </ZCYFormItem>
                  <ZCYFormItem
                    label="机构内部认识财务和业务管理制度说明"
                    className="zcy-form-item-mtext"
                    type="upload"
                  >
                    <ZCYUpload
                      bizCode="1099"
                      userId={`${userId}`}
                      listType="text"
                      {...orgBusinessProps}
                    >
                      <Button type="ghost">点击上传</Button>
                    </ZCYUpload>
                  </ZCYFormItem>
                  <ZCYFormItem
                    label="人事档案管理代理证明"
                    className="zcy-form-item-mtext"
                    type="upload"
                  >
                    <ZCYUpload
                      bizCode="1099"
                      userId={`${userId}`}
                      listType="text"
                      {...personnelFilesProps}
                    >
                      <Button type="ghost">点击上传</Button>
                    </ZCYUpload>
                  </ZCYFormItem>
                  {changeFullName
                    ? <div style={{ marginTop: -1 }}>
                        <ZCYFormItem
                          label="变更申请书"
                          className="zcy-form-item-mtext"
                          type="upload"
                          required
                        >
                          <ZCYUpload
                            bizCode="1099"
                            userId={`${userId}`}
                            listType="text"
                            {...getFieldProps('AGE_ORG_CHANGE_COMPANY_FIEL', {
                              valuePropName: 'fileList',
                              normalize: this.normFile
                            })}
                          >
                            <Button type="ghost">点击上传</Button>
                          </ZCYUpload>
                        </ZCYFormItem>
                        <ZCYFormItem
                          label="变更依据"
                          className="zcy-form-item-mtext"
                          type="upload"
                          required
                        >
                          <ZCYUpload
                            bizCode="1099"
                            userId={`${userId}`}
                            listType="text"
                            {...getFieldProps('AGE_ORG_CHANGE_ACCORDING_FILE', {
                              valuePropName: 'fileList',
                              normalize: this.normFile
                            })}
                          >
                            <Button type="ghost">点击上传</Button>
                          </ZCYUpload>
                        </ZCYFormItem>
                      </div>
                    : null}
                </div>
              </ZCYPanel.Body>
            </ZCYPanel>
          </ZCYForm>
        </ZCYContainer>
      </div>
    )
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return props.formData
  },
  onFieldsChange(props, fields) {
    props.duplexFormData(fields)
  }
})(Organic)
