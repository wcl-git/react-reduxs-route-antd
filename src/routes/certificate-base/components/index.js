import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  ZCYPanel,
  ZCYForm,
  ZCYContainer,
  ZCYStatus,
  ZCYTab,
  ZCYStepTab,
  ZCYUpload,
  Address,
  ZCYUtils
} from 'zcy-common';
import {
  Radio, 
  Breadcrumb, 
  Button, 
  Icon,
  Form,
  Row
} from 'zcy-antd';
import {Link} from 'react-router';
import { AgencyStatus, StepTab, AgencyModal, getPower, AgencySubmit } from 'components-common'
import BaseInfo from './baseInfo';
const RadioGroup = Radio.Group;
class CertificateBase extends Component {
  /**
   * state初始化
   */
  state = {
    modalType: '',
    modalVisible: false,
    onOk: null,
    isAudit: getPower.isAudit()
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  componentDidMount() {
    const { routeParams, getCertificate } = this.props;
    let orgId;
    if (this.state.isAudit) {
      orgId = getPower.orgId()
    }
    getCertificate({
      orgId
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.props.type) {
      this.setState({
        type: nextProps.type
      })
    }
  }

  /**
   * 根据证件类型生产form
   *
   */

  generateForm = (type)=>{
    const { updateFormData, businessData, taxData, organizationData, InsuranceData, userId, editEnable } = this.props;
    let forms = [];
    /**
     * certificateType
     * Organization_FormItems:组织机构代码证
     * Business_FormItems_1:营业执照
     * Tax_FormItems:国税税务登记证
     * Insurance_FormItems_1:社保登记证
     */

    switch (type) {
      case 'common':
        forms=[
          <BaseInfo 
            key="Business_FormItems_1" 
            ref="Business_FormItems_1" 
            certificateType="Business_FormItems_1" 
            editEnable={editEnable}
            userId={userId}
            updateFormData={updateFormData}
            belongTo="businessData"
            formData={businessData}/>,
          <BaseInfo 
            key="Tax_FormItems" 
            ref="Tax_FormItems"
            certificateType="Tax_FormItems"
            editEnable={editEnable} 
            userId={userId}
            belongTo="taxData"
            updateFormData={updateFormData}
            formData={taxData}/>,
          <BaseInfo 
            key="Organization_FormItems" 
            ref="Organization_FormItems" 
            certificateType="Organization_FormItems" 
            editEnable={editEnable} 
            userId={userId}
            belongTo="organizationData"
            updateFormData={updateFormData}
            formData={organizationData}/>,
          <BaseInfo 
            key="Insurance_FormItems_1" 
            ref="Insurance_FormItems_1" 
            certificateType="Insurance_FormItems_1" 
            editEnable={editEnable} 
            userId={userId}
            belongTo="InsuranceData"
            updateFormData={updateFormData}
            formData={InsuranceData}/>
        ];
        break;
      case 'threeToOne':
        forms=[
          <BaseInfo 
            key="Business_FormItems_3" 
            ref="Business_FormItems_3" 
            certificateType="Business_FormItems_3" 
            editEnable={editEnable} 
            userId={userId}
            belongTo="businessData"
            updateFormData={updateFormData}
            formData={businessData}/>,
          <BaseInfo 
            key="Insurance_FormItems_3" 
            ref="Insurance_FormItems_3" 
            certificateType="Insurance_FormItems_3" 
            editEnable={editEnable} 
            userId={userId}
            belongTo="InsuranceData"
            updateFormData={updateFormData}
            formData={InsuranceData}/>
        ];
        break;
      case 'oneToOne':
        forms=[
          <BaseInfo 
            ref="Business_FormItems_5" 
            certificateType="Business_FormItems_5" 
            editEnable={editEnable} 
            formData={businessData}
            belongTo="businessData"
            updateFormData={updateFormData}
            userId={userId}/>
        ];
        break;
    }
    return forms;
  }

  submitForm = ()=>{
    switch (this.props.type) {
      case 'oneToOne':
        this.oneToOneSubmitForm();
        break;
      case 'threeToOne':
        this.threeToOneSubmitForm();
        break;
      case 'common':
        this.commonSubmitForm();
        break;
    }
  }

  oneToOneSubmitForm = () => {
    this.refs.Business_FormItems_5.validateFieldsAndScroll((err, data) => {
      data.type = this.state.type;
      data.certificateType = 2
      data.orgId = 100037300;
      this.props.updateCertificate([data])
    })
  }

  threeToOneSubmitForm = () => {
    const { type, updateCertificate } = this.props;
    let Business_FormItems_P = new Promise((resolve, reject) => {
      this.refs.Business_FormItems_3.validateFieldsAndScroll((err, data) => {
        if (err) {  
          reject()
        }
        data.type = type;
        data.certificateType = 2;
        resolve(data);
      })
    })

    let Insurance_FormItems_P = new Promise((resolve, reject) => {
      this.refs.Insurance_FormItems_3.validateFieldsAndScroll((err, data) => {
        if (err) {  
          reject()
        }
        data.type = type;
        data.certificateType = 7;
        resolve(data);
      })
    })
    Promise.all([
      Business_FormItems_P,
      Insurance_FormItems_P
    ]).then((result) => {
      updateCertificate(result)
    })
  }

  commonSubmitForm = () => {
    const { type, updateCertificate } = this.props;
    let Business_FormItems_P = new Promise((resolve, reject) => {
      this.refs.Business_FormItems_1.validateFieldsAndScroll((err, data) => {
        if (err) {  
          reject()
        }
        data.type = type;
        data.certificateType = 2;
        resolve(data);
      })
    })

    let Tax_FormItems_P = new Promise((resolve, reject) => {
      this.refs.Tax_FormItems.validateFieldsAndScroll((err, data) => {
        if (err) {  
          reject()
        }
        data.type = type;
        data.certificateType = 4;
        resolve(data);
      })
    })

    let Organization_FormItems_P = new Promise((resolve, reject) => {
      this.refs.Organization_FormItems.validateFieldsAndScroll((err, data) => {
        if (err) {  
          reject()
        }
        data.type = type;
        data.certificateType = 1;
        resolve(data);
      })
    })

    let Insurance_FormItems_P = new Promise((resolve, reject) => {
      this.refs.Insurance_FormItems_1.validateFieldsAndScroll((err, data) => {
        if (err) {  
          reject()
        }
        data.type = type;
        data.certificateType = 7;
        resolve(data);
      })
    })

    Promise.all([
      Business_FormItems_P,
      Tax_FormItems_P,
      Organization_FormItems_P,
      Insurance_FormItems_P
    ]).then((result) => {
      updateCertificate(result);
    })
  }

  onCertificateChange = (e) => {
    this.props.changeRadio(e.target.value)
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

  tabChange = (key) => {
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
  /**
   * 渲染函数
   */
  render() {
    const { editEnable, type } = this.props;
    const { modalType, modalVisible, onOk, isAudit } = this.state;
    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <AgencySubmit />
          </div>
        </div>
        <ZCYContainer>
          <AgencyStatus statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"></AgencyStatus>
          <StepTab></StepTab>
          <AgencyModal 
            modalType={modalType} 
            visible={modalVisible} 
            onOk={onOk} 
            onCancel={() => {this.setState({modalVisible: false})}}>
            </AgencyModal>
          <ZCYPanel>
            <ZCYPanel.Header title="资质信息">
              {
                !isAudit && (
                  editEnable ? (
                    <span>
                      <Button onClick={this.cancel}>取消</Button>
                      <Button onClick={this.submitForm}>保存</Button>
                    </span>
                  ) : <Button onClick={this.toggleForm}>编辑</Button>
                )
              }
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <ZCYTab activeKey="FIRST_ORG" onChange={this.tabChange}>
                <ZCYTab.Pane tab="基本资质信息" key="FIRST_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="特定资质信息" key="AGAIN_ORG"></ZCYTab.Pane>
                <ZCYTab.Pane tab="信用信息" key="agency_change"></ZCYTab.Pane>
              </ZCYTab>
              {
                editEnable ? (
                  <Row style={{ margin: '20px 0'}}>
                    <RadioGroup value={type} onChange={this.onCertificateChange}>
                      <Radio key="oneToOne" value='oneToOne' >五证合一</Radio>
                      <Radio key="threeToOne" value='threeToOne' >三证合一</Radio>
                      <Radio key='common' value='common'>普通类型</Radio>
                    </RadioGroup>
                  </Row>
                ) : null
              }
              {this.generateForm(type)}
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
    )
  }
}
export default CertificateBase;
