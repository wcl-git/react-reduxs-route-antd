import React, { Component } from 'react';
import {
  ZCYPanel,
  ZCYForm,
  ZCYContainer,
  ZCYStatus,
  ZCYTab,
  ZCYStepTab,
  ZCYUpload,
  Downloader,
  Previewer,
  Address,
  ZCYDatePicker
} from 'zcy-common';
import { 
  Radio, 
  Button, 
  Form, 
  Input, 
  InputNumber 
} from 'zcy-antd';
const RadioGroup = Radio.Group;
const FormItem = ZCYForm.Item;

class BaseInfoForm extends Component {

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { userId, editEnable } = this.props;

    const isIndustrialAndCommercial = getFieldProps('isIndustrialAndCommercial');
    const socialCreditCode = getFieldProps('socialCreditCode');
    const bizLicenseCode = getFieldProps('bizLicenseCode');
    const institutionCode = getFieldProps('institutionCode');
    const certificateOrgname = getFieldProps('certificateOrgname');
    const certificateDate = getFieldProps('certificateDate');
    const companyCreateTime = getFieldProps('companyCreateTime');
    const validtimeStart = getFieldProps('validtimeStart');
    const validtimeEnd = getFieldProps('validtimeEnd');
    const registerCapital = getFieldProps('registerCapital');
    const mainscope = getFieldProps('mainscope');
    const sidescope = getFieldProps('sidescope');
    const remarks = getFieldProps('remarks');

    const taxCode = getFieldProps('taxCode');
    const isScottare = getFieldProps('isScottare');

    const certificateCode = getFieldProps('certificateCode');

    const onjobQuantity = getFieldProps('onjobQuantity');
    const socialPayQuantity = getFieldProps('socialPayQuantity');
    const isPaySocialfunds = getFieldProps('isPaySocialfunds');
    const endowmentQuantity = getFieldProps('endowmentQuantity');
    const unemploymentInsureQuantity = getFieldProps('unemploymentInsureQuantity');

    const applicantName = getFieldProps('applicantName');
    
    //营业执照
    const Business_FormItems_1 = (
      <ZCYForm editEnable={editEnable} >
        <ZCYPanel.SubHeader title="营业执照" order="1" />
        <FormItem
          label="类型"
          required
        >
          <RadioGroup {...isIndustrialAndCommercial }>
            <Radio key="nonIndividual" value={0}>非个体工商户</Radio>
            <Radio key="individual" value={1}>个体工商户</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="营业执照号"
          hasFeedback
          required
        >
          <Input {...bizLicenseCode } placeholder="请输入营业执照号" />
        </FormItem>
        <FormItem
          label="登记机关"
          hasFeedback
          required
        >
          <Input  {...certificateOrgname } placeholder="请输入登记机关"/>
        </FormItem>
        <FormItem
          label="登记机关所属区划"
          required
        >
          <Address
            type="address"
            {...getFieldProps('districtId') }
          />
        </FormItem>
        <FormItem
          label="营业执照住所"
          required
        >
          <Input {...getFieldProps('address') } />
        </FormItem>
        <FormItem
          label="发证日期"
          type="date"
          required
        >
          <ZCYDatePicker
            {...certificateDate }
          />
        </FormItem>
        <FormItem
          label="成立日期"
          type="date"
          required
        >
          <ZCYDatePicker
            {...companyCreateTime }
          />
        </FormItem>
        <FormItem
          label="营业期限"
          type="range"
          required
        >
          <ZCYDatePicker
            {...validtimeStart }
          />
          <span style={{margin: '0 10px'}}>~</span>
          <ZCYDatePicker
            {...validtimeEnd }
          />
        </FormItem>
        <FormItem
          label="注册资本"
          required
        >
          <InputNumber
            {...registerCapital }
            placeholder="请输入注册资本" />
        </FormItem>
        <FormItem
          label="经营范围"
          hasFeedback
          required
        >
          <Input
            {...mainscope }
            placeholder="请输入经营范围"
          />
        </FormItem>
        <FormItem
          label="兼营范围"
          hasFeedback
        >
          <Input
            {...sidescope }
            placeholder="请输入兼营范围" />
        </FormItem>
        <FormItem
          label="备注"
          className="zcy-form-item-mtext"
        >
          <Input type="textarea"
            {...remarks }
          />
        </FormItem>
        <FormItem
          label="营业执照扫描件"
          className="zcy-form-item-mtext"
          type="upload"
        >
          <ZCYUpload bizCode="1099" userId={userId} {...getFieldProps('attachments', {
            valuePropName: 'fileList',
            normalize: this.normFile
          })}>
            <Button>点击上传</Button>
          </ZCYUpload>
        </FormItem>
      </ZCYForm>
    )
    //三证合一营业执照
    const Business_FormItems_3 = (
      <ZCYForm editEnable={editEnable}>
        <ZCYPanel.SubHeader title="营业执照" order="1" />
        <FormItem
          label="类型"
        >
          <RadioGroup {...isIndustrialAndCommercial }>
            <Radio key="nonIndividual" value={0}>非个体工商户</Radio>
            <Radio key="individual" value={1}>个体工商户</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="营业执照号"
          hasFeedback
        >
          <Input {...bizLicenseCode } placeholder="请输入营业执照号" />
        </FormItem>
        <FormItem
          label="机构代码号"
          hasFeedback
          required
        >
          <Input {...institutionCode } placeholder="请输入营业执照号" />
        </FormItem>
        <FormItem
          label="税务登记证号"
          hasFeedback
          required
        >
          <Input {...taxCode } placeholder="请输入营业执照号" />
        </FormItem>
        <FormItem
          label="登记机关"
          hasFeedback
          required
        >
          <Input  {...certificateOrgname } placeholder="请输入登记机关" />
        </FormItem>
        <FormItem
          label="登记机关所属区划"
          required
        >
        </FormItem>
        <FormItem
          label="营业执照住所"
          required
        >
        </FormItem>
        <FormItem
          label="发证日期"
          type="date"
          required
        >
          <ZCYDatePicker
            {...certificateDate }
          />
        </FormItem>
        <FormItem
          label="成立日期"
          type="date"
          required
        >
          <ZCYDatePicker
            {...companyCreateTime }
          />
        </FormItem>
        <FormItem
          label="营业期限"
          type="range"
          required
        >
          <ZCYDatePicker
            {...validtimeStart }
          />
          <span style={{margin: '0 10px'}}>~</span>
          <ZCYDatePicker
            {...validtimeEnd }
          />
        </FormItem>
        <FormItem
          label="注册资本"
          required
        >
          <InputNumber
            {...registerCapital } />
        </FormItem>
        <FormItem
          label="经营范围"
          hasFeedback
          required
        >
          <Input
            {...mainscope }
            placeholder="请输入经营范围"
          />
        </FormItem>
        <FormItem
          label="兼营范围"
          hasFeedback
        >
          <Input
            {...sidescope }
            placeholder="请输入兼营范围" />
        </FormItem>
        <FormItem
          label="备注"
          className="zcy-form-item-mtext"
        >
          <Input type="textarea"
            {...remarks }
          />
        </FormItem>
        <FormItem
          label="营业执照扫描件"
          className="zcy-form-item-mtext"
          type="upload"
        >
          <ZCYUpload bizCode="1099" userId={userId} {...getFieldProps('attachments', {
            valuePropName: 'fileList',
            normalize: this.normFile
          })}>
            <Button>点击上传</Button>
          </ZCYUpload>
        </FormItem>
      </ZCYForm>
    )
    //五证合一营业执照
    const Business_FormItems_5 = (
      <ZCYForm editEnable={editEnable}>
        <ZCYPanel.SubHeader title="营业执照" order="1" />
        <FormItem
          label="类型"
          required
        >
          <RadioGroup {...isIndustrialAndCommercial }>
            <Radio key="nonIndividual" value={0}>非个体工商户</Radio>
            <Radio key="individual" value={1}>个体工商户</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="统一社会信用代码"
          hasFeedback
          required
        >
          <Input {...socialCreditCode } placeholder="请输入统一社会信用代码" />
        </FormItem>
        <FormItem
          label="登记机关"
          hasFeedback
          required
        >
          <Input  {...certificateOrgname } placeholder="请输入登记机关" />
        </FormItem>
        <FormItem
          label="登记机关所属区划"
          required
        >
          <Address type="district"/>
        </FormItem>
        <FormItem
          label="营业执照住所"
          required
        >
          <Address {...getFieldProps('address') } />
          <Input {...getFieldProps('address') } />
        </FormItem>
        <FormItem
          label="发证日期"
          type="date"
          required
        >
          <ZCYDatePicker {...certificateDate }
          />
        </FormItem>
        <FormItem
          label="成立日期"
          type="date"
          required
        >
          <ZCYDatePicker {...companyCreateTime }
          />
        </FormItem>
        <FormItem
          label="营业期限"
          required
        >
          <ZCYDatePicker
            {...validtimeStart }
          />
          <span style={{margin: '0 10px'}}>~</span>
          <ZCYDatePicker
            {...validtimeEnd }
          />
        </FormItem>
        <FormItem
          label="注册资本"
          required
        >
          <InputNumber {...registerCapital } />
        </FormItem>
        <FormItem
          label="经营范围"
          hasFeedback
          required
        >
          <Input
            {...mainscope }
            placeholder="请输入经营范围"
          />
        </FormItem>
        <FormItem
          label="兼营范围"
          hasFeedback
        >
          <Input
            {...sidescope }
            placeholder="请输入兼营范围" />
        </FormItem>
        <FormItem
          label="备注"
          className="zcy-form-item-mtext"
        >
          <Input type="textarea"
            {...remarks }
          />
        </FormItem>
        <FormItem
          label="营业执照扫描件"
          className="zcy-form-item-mtext"
          type="upload"
        >
          <ZCYUpload bizCode="1099" userId={userId} {...getFieldProps('attachments', {
            valuePropName: 'fileList',
            normalize: this.normFile
          })}>
            <Button>点击上传</Button>
          </ZCYUpload>
        </FormItem>
      </ZCYForm>
    )
    //税务登记证
    const Tax_FormItems = (
      <ZCYForm editEnable={editEnable}>
        <ZCYPanel.SubHeader title="税务登记证" order="2" />
        <FormItem
          label="税务登记证号"
          hasFeedback
          required
        >
          <Input {...taxCode } placeholder="请输入税务登记证号" />
        </FormItem>
        <FormItem
          label="发证机构"
          hasFeedback
          required
        >
          <Input  {...certificateOrgname } placeholder="请输入发证机构" />
        </FormItem>
        <FormItem
          label="发证日期"
          required
        >
          <ZCYDatePicker
            {...certificateDate } />
        </FormItem>
        <FormItem
          label="有效期限"
          required
        >
          <ZCYDatePicker
            {...validtimeStart }
          />
          <span style={{margin: '0 10px'}}>~</span>
          <ZCYDatePicker
            {...validtimeEnd }
          />
        </FormItem>
        <FormItem
          label="是否依法纳税"
          required
        >
          <RadioGroup {...isScottare }>
            <Radio key="scottare" value={1}>是</Radio>
            <Radio key="noScottare" value={0}>否</Radio>
          </RadioGroup >
        </FormItem>
        <FormItem
          label="备注"
          className="zcy-form-item-mtext"
        >
          <Input type="textarea" rows={4}
            {...remarks }
          />
        </FormItem>
        <FormItem
          label="税务登记证扫描件"
          className="zcy-form-item-mtext"
          type="upload"
        >
          <ZCYUpload bizCode="1099" userId={userId} {...getFieldProps('attachments', {
            valuePropName: 'fileList',
            normalize: this.normFile
          })}>
            <Button>点击上传</Button>
          </ZCYUpload>
        </FormItem>
      </ZCYForm>
    );
    //组织机构代码证
    const Organization_FormItems = (
      <ZCYForm editEnable={editEnable}>
        <ZCYPanel.SubHeader title="组织机构代码证" order="3" />
        <FormItem
          label="组织机构代码"
          hasFeedback
          required
        >
          <Input {...certificateCode } placeholder="请输入税务登记证号" />
        </FormItem>
        <FormItem
          label="发证机构"
          hasFeedback
          required
        >
          <Input  {...certificateOrgname } placeholder="请输入税务登记证号" />
        </FormItem>
        <FormItem
          label="发证日期"
          type="date"
          required
        >
          <ZCYDatePicker
            {...certificateDate } />
        </FormItem>
        <FormItem
          label="有效期限"
        >
          <ZCYDatePicker
            {...validtimeStart }
          />
          <span style={{margin: '0 10px'}}>~</span>
          <ZCYDatePicker
            {...validtimeEnd }
          />
        </FormItem>
        <FormItem
          label="备注"
          className="zcy-form-item-mtext"
        >
          <Input type="textarea" rows={4}
            {...remarks }
          />
        </FormItem>
        <FormItem
          label="组织机构代码证扫描件"
          className="zcy-form-item-mtext"
          type="upload"
        >
          <ZCYUpload bizCode="1099" userId={userId} {...getFieldProps('attachments', {
            valuePropName: 'fileList',
            normalize: this.normFile
          })}>
            <Button>点击上传</Button>
          </ZCYUpload>
        </FormItem>
      </ZCYForm>
    );
    //社会保险登记证
    const Insurance_FormItems_1 = (
      <ZCYForm editEnable={editEnable}>
        <ZCYPanel.SubHeader title="社会保险登记证" order="4" />
        <FormItem
          label="社会保险登记证号"
          hasFeedback
          required
        >
          <Input {...certificateCode } placeholder="请输入税务登记证号" />
        </FormItem>
        <FormItem
          label="发证机构"
          hasFeedback
          required
        >
          <Input  {...certificateOrgname } placeholder="请输入发证机构" />
        </FormItem>
        <FormItem
          label="发证日期"
          type="date"
          required
        >
          <ZCYDatePicker
            {...certificateDate } />
        </FormItem>
        <FormItem
          label="有效期限"
          required
        >
          <ZCYDatePicker
            {...validtimeStart }
          />
          <span style={{margin: '0 10px'}}>~</span>
          <ZCYDatePicker
            {...validtimeEnd }
          />
        </FormItem>
        <FormItem
          label="在职人数"
          required
        >
          <InputNumber
            {...onjobQuantity }
          />
        </FormItem>
        <FormItem
          label="社保缴费人数"
          required
        >
          <InputNumber
            {...socialPayQuantity }
          />
        </FormItem>
        <FormItem
          label="是否依法缴纳社保基金"
          required
        >
          <RadioGroup {...isPaySocialfunds }>
            <Radio key="paySocialfunds" value={1}>是</Radio>
            <Radio key="noPaySocialfunds" value={0} >否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="养老保险缴纳人数"
        >
          <InputNumber
            {...endowmentQuantity }
          />
        </FormItem>
        <FormItem
          label="失业保险缴费人数"
        >
          <InputNumber
            {...unemploymentInsureQuantity }
          />
        </FormItem>
        <FormItem
          label="备注"
          className="zcy-form-item-mtext"
        >
          <Input type="textarea" rows={4}
            {...remarks }
          />
        </FormItem>
        <FormItem
          label="社会保险登记证扫描件"
          className="zcy-form-item-mtext"
          type="upload"
        >
          <ZCYUpload bizCode="1099" userId={userId} {...getFieldProps('attachments', {
            valuePropName: 'fileList',
            normalize: this.normFile
          })}>
            <Button>点击上传</Button>
          </ZCYUpload>
        </FormItem>
      </ZCYForm>
    );
    //三证合一社会保险登记证
    const Insurance_FormItems_3 = (
      <ZCYForm editEnable={editEnable}>
        <ZCYPanel.SubHeader title="社会保险登记证" order="2" />
        <FormItem
          label="社会保险登记证号"
          hasFeedback
          required
        >
          <Input {...certificateCode } placeholder="请输入税务登记证号" />
        </FormItem>
        <FormItem
          label="发证机构"
          hasFeedback
          required
        >
          <Input  {...certificateOrgname } placeholder="请输入发证机构" />
        </FormItem>
        <FormItem
          label="有效期限"
        >
          <ZCYDatePicker
            {...validtimeStart }
          />
          <span style={{margin: '0 10px'}}>~</span>
          <ZCYDatePicker
            {...validtimeEnd }
          />
        </FormItem>
        <FormItem
          label="委托单位名称"
          hasFeedback
          required
        >
          <Input  {...applicantName } placeholder="请输入委托单位名称" />
        </FormItem>
        <FormItem
          label="在职人数"
          required
        >
          <InputNumber
            {...onjobQuantity }
          />
        </FormItem>
        <FormItem
          label="社保缴费人数"
          required
        >
          <InputNumber
            {...socialPayQuantity }
          />
        </FormItem>
        <FormItem
          label="是否依法缴纳社保基金"
        >
          <RadioGroup {...isPaySocialfunds }>
            <Radio key="a" value={1}>是</Radio>
            <Radio key="b" value={0} >否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="养老保险缴纳人数"
        >
          <InputNumber
            {...endowmentQuantity }
          />
        </FormItem>
        <FormItem
          label="失业保险缴费人数"
        >
          <InputNumber
            {...unemploymentInsureQuantity }
          />
        </FormItem>
        <FormItem
          label="备注"
          className="zcy-form-item-mtext"
        >
          <Input type="textarea" rows={4}
            {...remarks }
          />
        </FormItem>
        <FormItem
          label="社会保险登记证扫描件"
          className="zcy-form-item-mtext"
          type="upload"
        >
          <ZCYUpload bizCode="1099" userId={userId} {...getFieldProps('attachments', {
            valuePropName: 'fileList',
            normalize: this.normFile
          })}>
            <Button>点击上传</Button>
          </ZCYUpload>
        </FormItem>
      </ZCYForm>
    );

    const FormMap = {
      Business_FormItems_1,
      Business_FormItems_3,
      Business_FormItems_5,
      Tax_FormItems,
      Organization_FormItems,
      Insurance_FormItems_1,
      Insurance_FormItems_3
    }
    return (
      FormMap[this.props.certificateType]
    )
  }
}

BaseInfoForm = Form.create({
  mapPropsToFields(props) {
    return props.formData;
  },
  onFieldsChange(props, fields) {
    props.updateFormData({
      key: props.belongTo,
      value: fields
    });
  }
})(BaseInfoForm);

export default BaseInfoForm;