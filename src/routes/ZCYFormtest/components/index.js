import React, {Component} from 'react';

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
  District,
  ZCYDatePicker
} from 'zcy-common';

import {
  Breadcrumb,
  Button,
  Icon,
  Input,
  Form
} from 'zcy-antd';
import {Link} from 'react-router';
const FormItem = ZCYForm.Item;
const RangePicker = ZCYDatePicker.RangePicker

class Demo extends Component {
  /**
   * 组件的属性校验
   */
  static propTypes = {
  }

  defaultProps = {
    editEnable: true
  }

  state={
    editEnable:true
  }

  componentDidMount() {
    const {params}=this.props
    this.props.init(params);
  }

  cancel=()=>{
    this.setState({
      editEnable:false
    })
  }

  submitForm =()=>{
    let data = this.props.form.getFieldValue();
    let text = this.refs.address.label;

      this.setState({
        editEnable:true
      })
  }

  render() {
    const {getFieldProps} = this.props.form;
    const {editEnable} = this.props
    const userName =  getFieldProps('userName')
    console.log(userName);

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
            <ZCYForm editEnable={this.state.editEnable}>
              <FormItem
                label="地址选择"
                required
                type="address"
              >
                <Address
                  type="address"
                  {...getFieldProps('area')}
                  ref="address"
                />
                <Input placeholder="请输入账户名" {...getFieldProps('abc')}
                       style={{width: '220px', 'margin-left': '60px'}}/>
              </FormItem>
              <FormItem
                label="区划"
                required
                type="district"
              >
                <Address
                  type="district"
                  ref="district"
                />
              </FormItem>
              <  FormItem
                label="区划"
                required
              >
                <District/>
              </FormItem>
              <  FormItem
                label="时间"
                required
              >
                <RangePicker {...getFieldProps('1')}/>
              </FormItem>

            </ZCYForm>
          </ZCYPanel.Body>
        </ZCYPanel>
      </ZCYContainer>
    </div>
    );
  }
}
Demo = Form.create({
  mapPropsToFields(props) {
    return props.formData;
  }
})(Demo);

export default Demo;
