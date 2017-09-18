import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  ZCYPanel,
  ZCYForm,
  ZCYContainer,
  ZCYTab,
  ZCYUpload,
  Address,
  ZCYDatePicker,
  ZCYValidate,
  ZCYUtils
} from 'zcy-common';
import {
  Radio, 
  Breadcrumb, 
  Button, 
  Icon,
  Form,
  Row,
  Input,
  message,
  TreeSelect,
  Select
} from 'zcy-antd';
import {Link} from 'react-router';
import { AgencyStatus, getPower, StepTab, AgencyModal, AgencySubmit } from 'components-common'
const RadioGroup = Radio.Group;
class CertificateCredit extends Component {
  /**
   * 组件的属性校验
   * form:
   */
  static propTypes = {
    form: PropTypes.object.isRequired,
    formData:PropTypes.object.isRequired
  }

  state = {
    modalVisible: false,
    modalType: '',
    onOk: null,
    treeData: [],
    name: '',
    levelList: [],
    isAudit: getPower.isAudit()
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  componentDidMount() {
    const { routeParams, getSpecificTrees, getSpecific } = this.props;
    if (routeParams.id) {
      let orgId;
      if (this.state.isAudit) {
        orgId = getPower.orgId()
      }
      getSpecific({
        id: routeParams.id
      }).then((res) => {
        this.handleTreeSelect(res.code.value)
      });
    }
    getSpecificTrees().then((result) => {
      let treeData = this.transformTreeData(result)
      this.setState({
        treeData
      })
    })
  }

  transformTreeData = (data) => {
    if (!data) {
      return []
    }
    return data.map((obj, index) => {
      return {
        label: obj.node.name,
        value: obj.node.code,
        key: obj.node.code,
        children: this.transformTreeData(obj.data)
      }
    })
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  submitForm = () => {
    const { routeParams } = this.props;
    
    let data = this.props.form.getFieldsValue();
    data.attachmentMaps = {
      AGE_ORG_SPECIFIC_QUALIFIED_FILE: data.AGE_ORG_SPECIFIC_QUALIFIED_FILE ? data.AGE_ORG_SPECIFIC_QUALIFIED_FILE : [],
      AGE_ORG_AGENCY_CERTIFICATE_FILE: data.AGE_ORG_AGENCY_CERTIFICATE_FILE ? data.AGE_ORG_AGENCY_CERTIFICATE_FILE : [],
      AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE: data.AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE ? data.AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE : []
    }
    data.name = data.code.label;
    data.code = data.code.value;
    if (routeParams.id) {
      data.id = routeParams.id
    }
    delete data.AGE_ORG_SPECIFIC_QUALIFIED_FILE
    delete data.AGE_ORG_AGENCY_CERTIFICATE_FILE
    delete data.AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE
    console.log(data)
    this.props.updateCredit(data).then(() => {
      message.success('保存成功');
      this.toggleForm()
    })
  }

  save = () => {
    this.props.form.validateFieldsAndScroll((err, data) => {
      if (!!err) {
        message.warning('请完善数据')
        return
      }
      this.setState({
        modalType: 'save',
        modalVisible: true,
        onOk: this.submitForm
      })
    })
  }

  cancel = () => {
    this.setState({
      modalType: 'cancel',
      modalVisible: true,
      onOk: this.toggleForm
    })
  }

  toggleForm = () => {
    this.setState({
      modalVisible: false
    })
    this.props.toggleForm();
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

  checkEndTime = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    let beginTime = getFieldValue('effectiveBeginTime');
    if (value - beginTime <= 0) {
      callback(new Error('结束日期不能小于等于开始日期'))
    } else {
      callback()
    }
  }

  handleTreeSelect = (value) => {
    let code = value.value
    debugger
    if (!code) {
      return
    }
    this.props.getDraftDetail({
      code
    }).then((res) => {
      this.setState({
        levelList: res.levels ? res.levels : []
      })
    })
  }

  /**
   * 渲染函数
   */
  render() {
    const { editEnable, auditEnable, userId, pageType } = this.props;
    const { getFieldProps } = this.props.form;
    const { modalVisible, onOk, modalType, treeData, levelList, isAudit } = this.state;

    const code = getFieldProps('code', {
      rules: [...ZCYValidate.required]
    });
    const level = getFieldProps('level', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(30)]
    });
    const certCode = getFieldProps('certCode', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(30)]
    });
    const effectiveBeginTime = getFieldProps('effectiveBeginTime', {
      rules: [...ZCYValidate.required]
    });
    const effectiveEndTime = getFieldProps('effectiveEndTime', {
      rules: [...ZCYValidate.required, {
        validator: this.checkEndTime
      }]
    });
    const approvalTime = getFieldProps('approvalTime', {
      rules: [...ZCYValidate.required]
    });
    const agencyName = getFieldProps('agencyName', {
      rules: [...ZCYValidate.required, ...ZCYValidate.text(30)]
    });
    const isRenewal = getFieldProps('isRenewal');
    const renewalTime = getFieldProps('renewalTime');
    const remark = getFieldProps('remark', {
      rules: [...ZCYValidate.text(500)]
    });
    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit />
          </div>
          <Breadcrumb >
            <Breadcrumb.Item><Link to="/certificate/base">资质信息</Link></Breadcrumb.Item>
            <Breadcrumb.Item><span>{pageType === 'detail' && '特定资质信息详情'}{pageType === 'create' && '特定资质信息创建'}{pageType === 'edit' && '特定资质信息编辑'}</span></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <AgencyModal 
            visible={modalVisible} 
            modalType={modalType}
            onOk={onOk}
            onCancel={() => {this.setState({modalVisible: false})}}></AgencyModal>
          <ZCYPanel>
            <ZCYPanel.Header title="资质信息">
              {
                !isAudit && (
                  editEnable ? (
                    <span>
                      <Button onClick={this.cancel}>取消</Button>
                      <Button onClick={this.save} className="zcy-ml">保存</Button>
                    </span>
                  ) : <Button onClick={this.toggleForm}>编辑</Button>
                )   
              }  
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <ZCYTab style={{marginBottom: '20px'}} defaultActiveKey="AGAIN_ORG" onTabClick={this.tabClick}>
                <ZCYTab.Pane tab="基本资质信息" key="FIRST_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="特定资质信息" key="AGAIN_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="信用信息" key="agency_change"></ZCYTab.Pane>
              </ZCYTab>
              <ZCYForm editEnable={editEnable} auditEnable={auditEnable}>
                <ZCYForm.Item
                  label="资质名称"
                  type="tree"
                  required
                >
                  <TreeSelect
                    showSearch={true}
                    treeData={treeData}
                    labelInValue={true}
                    treeNodeFilterProp='label'
                    dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
                    placeholder="请选择"
                    searchPlaceholder="请搜索"
                    treeCheckStrictly={false}
                    onSelect={this.handleTreeSelect}
                    {...code}
                    >
                  </TreeSelect>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="资质等级"
                  required
                >
                  <Select {...level}>
                    {
                      levelList.map((obj, index) => {
                        return <Select.Option key={+new Date() + index} value={obj.name}>{obj.name}</Select.Option>
                      })
                    }
                  </Select>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="证件编号"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入证件编号" {...certCode}/>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="发证日期"
                  type="date"
                  required
                >
                  <ZCYDatePicker {...approvalTime}/>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="发证机构名称"
                  hasFeedback
                  required
                >
                  <Input placeholder="请输入发证机构名称" {...agencyName}/>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="资质有效期限"
                  type="range"
                  required
                >
                  <ZCYDatePicker {...effectiveBeginTime} placeholder="请选择开始时间"/>
                  <span style={{margin: '0 10px'}}>-</span>
                  <ZCYDatePicker {...effectiveEndTime} placeholder="请选择结束时间"/>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否年检"
                >
                  <Radio.Group {...isRenewal}>
                    <Radio value={1}>是</Radio>
                    <Radio value={0}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="最近年检时间"
                  type="date"
                >
                  <ZCYDatePicker {...renewalTime}/>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="备注"
                  className="zcy-form-item-mtext"
                >
                  <Input type="textarea" placeholder="请输入备注" {...remark}/>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="变更页"
                  className="zcy-form-item-mtext"
                  type="upload"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={userId}
                    {...getFieldProps('AGE_ORG_SPECIFIC_QUALIFIED_FILE', {
                      valuePropName: 'fileList',
                      normalize: this.normFile
                    }) }>
                    <Button>上传附件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="资质证书正本"
                  className="zcy-form-item-mtext"
                  type="upload"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={userId}
                    {...getFieldProps('AGE_ORG_AGENCY_CERTIFICATE_FILE', {
                      valuePropName: 'fileList',
                      normalize: this.normFile
                    }) }>
                    <Button>上传附件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="资质证书副本"
                  className="zcy-form-item-mtext"
                  type="upload"
                >
                  <ZCYUpload
                    bizCode="1099"
                    userId={userId}
                    {...getFieldProps('AGE_ORG_AGENCY_COPY_CERTIFICATE_FILE', {
                      valuePropName: 'fileList',
                      normalize: this.normFile
                    }) }>
                    <Button>上传附件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
              </ZCYForm>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}

CertificateCredit = Form.create({
  mapPropsToFields(props) {
    return props.formData;
  },
  onFieldsChange(props, fields) {
    props.updateFormData(fields);
  }
})(CertificateCredit);

export default CertificateCredit;
