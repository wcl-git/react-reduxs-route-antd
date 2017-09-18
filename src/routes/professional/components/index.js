import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Breadcrumb,
  Button,
  Radio,
  InputNumber,
  Form,
  Icon,
  Input,
  message,
  Select
} from 'zcy-antd';
import {
  ZCYContainer,
  ZCYPanel,
  ZCYForm,
  ZCYUpload,
  Address,
  ZCYDatePicker,
  ZCYTab,
  ZCYValidate,
  ZCYUtils
} from 'zcy-common';
import { AgencyModal, StepTab, AgencyStatus, AgencySubmit, getPower } from 'components-common'
import { Link } from 'react-router';

class AgencyProfessional extends Component {
  static propTypes = {
    form: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { routeParams, getAgencyAuditInfo } = this.props;
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    this.props.getProfessional({
      userId: routeParams.userId,
      orgId
    });
    //getAgencyAuditInfo()
  }

  state = {
    modalVisible: false,
    modalType: '',
    onOk: null,
    isAudit: getPower.isAudit()
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  toggleForm = (type) => {
    const { routeParams } = this.props;
   
    if (this.state.modalVisible) {
      this.setState({
        modalVisible: false
      })
    }

    if (!type) {
      this.props.getProfessional({
        userId: routeParams.userId
      }).then(() => {
        this.props.toggleForm();
      });
    } else {
      this.props.toggleForm();
    }
  }

  submitForm = () => {
    const data = this.props.form.getFieldsValue();
    data.userId = this.props.routeParams.userId;
    //data.id = this.props.professional.id.value;
    data.bizProve = data.address[0]
    data.bizCity = data.address[1]
    data.bizDist = data.address[2]
    data.attachmentMaps = {
      PRO_CARDID_FILE: data.PRO_CARDID_FILE,
      PRO_EDUCATION_FILE: data.PRO_EDUCATION_FILE,
      PRO_INTERMEDIATE_FILE: data.PRO_INTERMEDIATE_FILE
    };
    //data.attachmentMaps.PRO_CARDID_FILE.bizId = 213
    delete data.address;
    delete data.PRO_CARDID_FILE;
    delete data.PRO_EDUCATION_FILE;
    delete data.PRO_INTERMEDIATE_FILE;
    this.props.saveFormData(data).then((res) => {
      message.success('保存成功!')
      this.context.router.push('professional/list')
    })
  }

  save = () => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (!!err) {
        message.warning('请完善数据')
        return
      }
      this.setState({
        modalVisible: true,
        modalType: 'save',
        onOk: this.submitForm
      })
    })
  }

  cancel = () => {
    this.setState({
      modalVisible: true,
      modalType: 'cancel',
      onOk: () => this.context.router.push('professional/list')
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    const { professional, editEnable, auditEnable,initData, userId, routeParams, pageType } = this.props
    const { modalVisible, modalType, onOk, isAudit } = this.state;
    const name = getFieldProps('name');
    const cardId = getFieldProps('cardId');
    const phone = getFieldProps('phone', {
      rules: [...ZCYValidate.mobile]
    });
    const email = getFieldProps('email', {
      rules: [...ZCYValidate.email]
    });
    const expertise = getFieldProps('expertise', {
      rules: [...ZCYValidate.text(500)]
    });
    const introduct = getFieldProps('introduct', {
      rules: [...ZCYValidate.text(500)]
    });
    const education = getFieldProps('education', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(10)]
    });
    const profession = getFieldProps('profession', {
      rules: [...ZCYValidate.text(50)]
    });
    const graduateUniversity = getFieldProps('graduateUniversity', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(50)]
    });
    const educationCode = getFieldProps('educationCode', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(50)]
    });
    const currentOrg = getFieldProps('currentOrg', {
      rules: [...ZCYValidate.text(60)]
    });
    const post = getFieldProps('post', {
      rules: [...ZCYValidate.text(50)]
    });
    const professionTitle = getFieldProps('professionTitle', {
      rules: [...ZCYValidate.text(50)]
    });
    const professionCode = getFieldProps('professionCode', {
      rules: [...ZCYValidate.text(50)]
    });
    const jobCertificateName = getFieldProps('jobCertificateName', {
      rules: [...ZCYValidate.text(50)]
    });
    
    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit></AgencySubmit>
          </div>
          <Breadcrumb >
            <Breadcrumb.Item><Link to="/professional/list">专职人员</Link></Breadcrumb.Item>
            <Breadcrumb.Item><span>{pageType === 'edit' && '专职人员编辑'}{pageType === 'detail' && '专职人员详情'}{pageType === 'audit' && '专职人员审批'}</span></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <ZCYPanel>
            <ZCYPanel.Header title="专职人员">
              {
                !isAudit && (
                  editEnable ? (
                    <span>
                      <span className="zcy-mr"><Icon type="info-circle-o" style={{ marginRight: '5px'}} />填写说明</span>
                      <Button className="zcy-mr" onClick={this.cancel}>取消</Button>
                      <Button onClick={this.save}>保存</Button>
                    </span>
                  ) : <Button onClick={this.toggleForm}>编辑</Button>
                )
              }
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <AgencyModal visible={modalVisible} modalType={modalType} onOk={onOk} onCancel={() => {this.setState({modalVisible: false})}}></AgencyModal>
              <ZCYForm editEnable={editEnable} auditEnable={true} auditType={`professional.${routeParams.userId}`}>
                <ZCYPanel.SubHeader title="基本信息" order="1"></ZCYPanel.SubHeader>
                <ZCYForm.Item
                  label="姓名"
                  required
                >
                  <Input disabled placeholder="请输入姓名" {...name} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="性别"
                  required
                >
                  <Radio.Group disabled {...getFieldProps('sex') }>
                    <Radio value={0}>男</Radio>
                    <Radio value={1}>女</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="年龄"
                  required
                >
                  <InputNumber disabled min={1} max={130} {...getFieldProps('age') }/>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="身份证号码"
                  required
                >
                  <Input disabled placeholder="请输入身份证号码" {...cardId} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="身份证扫描件"
                  className="zcy-form-item-mtext"
                  type="upload"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="picture"
                    {...getFieldProps('PRO_CARDID_FILE', {
                      valuePropName: 'fileList',
                      normalize: this.normFile
                    })}
                  >
                    <Button type="ghost">上传扫描件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="手机号码"
                >
                  <Input disabled placeholder="请输入手机号码" {...phone} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="邮箱"
                  
                >
                  <Input disabled placeholder="请输入邮箱" {...email} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="通讯地址"
                  type="address"
                >
                  <Address 
                    {...getFieldProps('address')}
                    ref="address"/>
                  <Input className="zcy-ml" placeholder="请输入街道地址" {...getFieldProps('communicationAddr')} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="个人专长"
                >
                  <Input placeholder="请输入个人专长" {...expertise} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="个人介绍"
                  className="zcy-form-item-mtext"
                >
                  <Input type="textarea" rows={4} {...introduct} />
                </ZCYForm.Item>
                <ZCYPanel.SubHeader title="学历信息" order="2"></ZCYPanel.SubHeader>
                <ZCYForm.Item
                  label="学历"
                  required
                >
                  <Select {...education}>
                    <Select.Option value="61">高中毕业</Select.Option>
                    <Select.Option value="31">专科毕业</Select.Option>
                    <Select.Option value="20">大学本科</Select.Option>
                    <Select.Option value="14">硕士</Select.Option>
                    <Select.Option value="13">博士</Select.Option>
                    <Select.Option value="12">博士后</Select.Option>
                    <Select.Option value="28">相当大学毕业</Select.Option>
                  </Select>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="专业"
                >
                  <Input placeholder="请输入专业" {...profession} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="毕业院校"
                  required
                >
                  <Input placeholder="请输入毕业院校" {...graduateUniversity} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="学历证编号"
                  required
                >
                  <Input placeholder="请输入学历证编号" {...educationCode} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="学历证扫描件"
                  className="zcy-form-item-mtext"
                  type="upload"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="picture"
                    {...getFieldProps('PRO_EDUCATION_FILE', {
                      valuePropName: 'fileList',
                      normalize: this.normFile
                    }) }
                  >
                    <Button type="ghost">上传扫描件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
                <ZCYPanel.SubHeader title="职业信息" order="3"></ZCYPanel.SubHeader>
                <ZCYForm.Item
                  label="在职单位"
                  
                >
                  <Input placeholder="请输入在职单位" {...currentOrg} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="入职日期"
                  
                >
                  <ZCYDatePicker {...getFieldProps('entryDate') } />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否兼职"
                  
                >
                  <Radio.Group {...getFieldProps('isTempJob') } >
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否外聘"
                  
                >
                  <Radio.Group {...getFieldProps('isExternalStaff') } >
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="职务"
                  
                >
                  <Input placeholder="请输入职务" {...post} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="首次从业开始时间"
                  
                >
                  <ZCYDatePicker {...getFieldProps('engageAgeTime') } />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="社会保障金缴纳起始时间"
                  
                >
                  <ZCYDatePicker {...getFieldProps('securityBeginTime') } />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="专业职称证书名称"
                  
                >
                  <Input placeholder="请输入专业职称证书名称" {...professionTitle} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="专业职称证书编号"
                  
                >
                  <Input placeholder="请输入专业职称证书编号" {...professionCode} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否中级以上职称"
                  
                >
                  <Radio.Group {...getFieldProps('isMiddle') }>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="执业注册资格证书名称"
                  
                >
                  <Input placeholder="请输入执业注册资格证书名称" {...jobCertificateName} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="执业注册资格证书扫描件"
                  className="zcy-form-item-mtext"
                  type="upload"
                  
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={`${userId}`}
                    listType="picture"
                    {...getFieldProps('PRO_INTERMEDIATE_FILE', {
                      valuePropName: 'fileList',
                      normalize: this.normFile
                    }) }>
                    <Button type="ghost">上传扫描件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否缴纳社会保证金"
                  
                >
                  <Radio.Group defaultValue="1" {...getFieldProps('isSecurity') } >
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否取得政府采购培训合格证书"
                  
                >
                  <Radio.Group defaultValue="1" {...getFieldProps('isOrgTrain') } >
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否签订劳动合同"
                  
                >
                  <Radio.Group defaultValue="1" {...getFieldProps('isWork') } >
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
              </ZCYForm>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

export default Form.create({
  mapPropsToFields(props) {
    return props.formData;
  },
  onFieldsChange(props, fields) {
    props.updateFormData(fields);
  }
})(AgencyProfessional);
