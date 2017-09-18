import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Button, Form, Table, Dropdown, Menu, Icon, Input } from 'zcy-antd'
import { ZCYContainer, ModalForm, ZCYTab, ZCYStatus, ZCYStepTab, ZCYPanel, ZCYForm, Validate } from 'zcy-common'
import { Link } from 'react-router';

class AgencyProfessional extends Component {

  componentDidMount() {
    const { params, location } = this.props
    this.props.initLoad({ orgId: 123})
  }

  render() {

    let { professionalList } = this.props

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
          <ZCYPanel>
            <ZCYPanel.Header title="记录详情"></ZCYPanel.Header>
            <ZCYPanel.Body>
              <ZCYPanel.SubHeader title="基本信息"></ZCYPanel.SubHeader>
              <ZCYForm.Item label="机构隶属关系">
                <Input placeholder="请输入账户名"/>
              </ZCYForm.Item>
              <ZCYForm.Item label="机构名称机构名称机构名称机构名称机构名称机构名称机构名称"></ZCYForm.Item>
              <ZCYForm.Item className="zcy-form-item-mtext" label="机构名称机构名称机构名称机构名称机构名称机构名称机构名称" type="pureText">
                单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行
                单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行
                单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行
              </ZCYForm.Item>
            </ZCYPanel.Body>
          </ZCYPanel>
        </ZCYContainer>
      </div>
      
    )
  }
}

export default AgencyProfessional
