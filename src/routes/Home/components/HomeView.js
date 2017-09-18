import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {ZCYPanel, ZCYForm, ZCYContainer, ZCYStatus, ZCYTab, ZCYStepTab, ZCYUpload, Downloader, Previewer } from 'zcy-common';
import {DatePicker, Breadcrumb, Button, Icon, Input} from 'zcy-antd';
import {Link} from 'react-router';
import './HomeView.less';

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 18},
};

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class HomeView extends Component {
  static defaultProps = {
    editEnable: true
  }

  state = {
    x: false
  }

  uploadFileChange = (params) => {
    if (params.file && params.file.status === 'uploading'){
      return;
    }
    console.log(params.fileList)
  }

  changeShow = () => {
    this.setState({
      show: !this.state.show
    })
  }

  handleChange = (info) => {
    if (info.file && info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
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
              <a href="javascript:;" className="test">审核说明</a>
          </ZCYStatus>
          <ZCYStepTab>
            <ZCYStepTab.Item status={true} to="/">审核说明</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">审核说明</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">审核说明</ZCYStepTab.Item>
            <ZCYStepTab.Item to="/table">审核说明</ZCYStepTab.Item>
          </ZCYStepTab>
          <ZCYTab tabBarExtraContent={(<a href="#">test</a>)}>
            <ZCYTab.Pane tab="选项卡一" key="1"></ZCYTab.Pane>
            <ZCYTab.Pane tab="选项卡2" key="2"></ZCYTab.Pane>
            <ZCYTab.Pane tab="选项卡3" key="3"></ZCYTab.Pane>
          </ZCYTab>
          <ZCYPanel>
            <ZCYPanel.Header title="我的头部">
              <span><Icon type="info-circle-o" />填写说明</span>
              <Button type="primary">测试</Button>
            </ZCYPanel.Header>
            <ZCYPanel.Body>

              <ZCYPanel.SubHeader title="基本信息" tip="（按照出资比例从高到低的原则，列明前十大出资人）" order="1"><span><Icon type="info-circle-o" />填写说明</span>
              <Button type="primary">测试</Button></ZCYPanel.SubHeader>
              <ZCYPanel.SubHeader title="基本信息" order="2"></ZCYPanel.SubHeader>
              <ZCYForm editEnable={this.props.editEnable}>
                <ZCYForm.Item label="机构隶属关系">
                  <Input placeholder="请输入账户名"/>
                </ZCYForm.Item>
                <ZCYForm.Item label="机构名称机构名称机构名称机构名称机构名称机构名称机构名称"><DatePicker/></ZCYForm.Item>
                <ZCYForm.Item className="zcy-form-item-mtext" label="机构名称机构名称机构名称机构名称机构名称机构名称机构名称" type="pureText">
                  单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行
                  单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行
                  单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行单元格内容多行
                </ZCYForm.Item>
                <ZCYForm.Item className="zcy-form-item-mtext" label="表头4">
                  <Button type="primary" onClick={this.changeShow}>test</Button>
                  <ZCYUpload bizCode="1099" listType="picture-card"  showOnly={this.state.show}
 userId="100012122"  onChange={this.uploadFileChange}>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传照片</div>
                  </ZCYUpload>
                  <ZCYUpload
                    className="avatar-uploader"
                    bizCode="1099"
                    userId="100012122"
                    onChange={this.handleChange}
                  >
                    {
                      imageUrl ?
                        <img src={imageUrl} alt="" className="avatar" /> :
                        (
                          <span>
                            <Icon type="plus" className="avatar-uploader-trigger" />
                            <div className="avatar-uploader-tip">图片大小不超过20M,支持png、jpg格式</div>
                          </span>
                        )
                    }
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

export default HomeView
