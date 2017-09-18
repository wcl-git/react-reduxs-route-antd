import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Breadcrumb,
  Button,
  Radio,
  InputNumber,
  Form,
  Icon,
  DatePicker,
  Input
} from 'zcy-antd';
import { 
  ZCYContainer, 
  ZCYStatus, 
  ZCYStepTab, 
  ZCYPanel, 
  ZCYForm,
  ZCYUpload,
  Address,
  Validate 
} from 'zcy-common';
import { Link } from 'react-router';

class AgencyProfessional extends Component {

  componentDidMount() {
    const { params, location } = this.props
    this.props.getProfessionalDetailById({ userId: '123'});
  }

  render() {

    let { professionalDetail, editEnable } = this.props

    return (
      <div>
        <div className="zcy-container-breadcrumb-wrapper">
          <div className="zcy-container-breadcrumb-btn-wrap">
            <Button type="primary">提交审核</Button>
          </div>
          <Breadcrumb >
            <Breadcrumb.Item><Link to="/table">我的面包屑1</Link></Breadcrumb.Item>
            <Breadcrumb.Item><span>我的面包屑2</span></Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <ZCYContainer>
          <ZCYStatus
            status="待审核"
            statusTip="[ 您需要填写以下代理机构基础信息，才可以提交审核 ]"
            textColor="primary"
            >
              <a href="javascript:;">审核说明</a>
              <a href="javascript:;">审核机构</a>
              <a href="javascript:;">打印申请</a>
              <a href="javascript:;">审核记录</a>
          </ZCYStatus>
          <ZCYStepTab>
            <ZCYStepTab.Item to="/">基本信息</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">资质信息</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">出资信息</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">财务信息</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">主要人员</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/professional/list">专职人员</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">业绩信息</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">场地信息</ZCYStepTab.Item>
          </ZCYStepTab>
          <ZCYPanel>
            <ZCYPanel.Header title="专职人员">
              <span><Icon type="info-circle-o" style={{ marginRight: '5px'}} />填写说明</span>
              <Button type="primary">测试</Button>
            </ZCYPanel.Header>
            <ZCYPanel.Body>
              <ZCYForm editEnable={editEnable}>
                <ZCYPanel.SubHeader title="基本信息" order="1"></ZCYPanel.SubHeader>
                <ZCYForm.Item
                  label="姓名"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="性别"
                  required
                >
                  <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="年龄"
                  required
                >
                  <InputNumber min={1} max={130} />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="身份证号码"
                  required
                >
                  <Input placeholder="请输入机构名称" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="身份证扫描件"
                  className="zcy-form-item-mtext"
                  required
                >
                  <ZCYUpload>
                    <Button type="ghost">上传扫描件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="手机号码"
                  required
                >
                  <Input placeholder="请输入机构名称" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="邮箱"
                  required
                >
                  <Input placeholder="请输入机构名称" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="通讯地址"
                  required
                >
                  <Address />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="个人专长"
                  required
                >
                  <Input placeholder="请输入机构名称" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="个人介绍"
                  className="zcy-form-item-mtext"
                  required
                >
                  <Input type="textarea" rows={4} />
                </ZCYForm.Item>
                <ZCYPanel.SubHeader title="学历信息" order="2"></ZCYPanel.SubHeader>
                <ZCYForm.Item
                  label="学历"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="专业"
                  required
                >
                  <Input placeholder="请输入性别" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="毕业院校"
                  required
                >
                  <Input placeholder="请输入性别" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="学历证编号"
                  required
                >
                  <Input placeholder="请输入性别" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="学历证扫描件"
                  className="zcy-form-item-mtext"
                  required
                >
                  <ZCYUpload>
                    <Button type="ghost">上传扫描件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
                <ZCYPanel.SubHeader title="职业信息" order="3"></ZCYPanel.SubHeader>
                <ZCYForm.Item
                  label="在职单位"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="入职日期"
                  required
                >
                  <DatePicker />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否兼职"
                  required
                >
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否外聘"
                  required
                >
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="职务"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="首次从业开始时间"
                  required
                >
                  <DatePicker />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="社会保障金缴纳起始时间"
                  required
                >
                  <DatePicker />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="首次审核机构"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="首次审核人员"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="专业职称证书名称"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="专业职称证书编号"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否中级以上职称"
                  required
                >
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="执业注册资格证书名称"
                  required
                >
                  <Input placeholder="请输入姓名" />
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="执业注册资格证书扫描件"
                  required
                >
                  <ZCYUpload>
                    <Button type="ghost">上传扫描件</Button>
                  </ZCYUpload>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否缴纳社会保证金"
                  required
                >
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否取得政府采购培训合格证书"
                  required
                >
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
                  </Radio.Group>
                </ZCYForm.Item>
                <ZCYForm.Item
                  label="是否签订劳动合同"
                  required
                >
                  <Radio.Group>
                    <Radio value={1}>是</Radio>
                    <Radio value={2}>否</Radio>
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

export default AgencyProfessional
