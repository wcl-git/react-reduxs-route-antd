import React, { Component } from 'react'
import { ZCYPanel, ZCYForm, ZCYStatus, ZCYContainer, ZCYValidate, Address, ZCYUpload, ZCYDatePicker, ZCYUtils } from 'zcy-common'
import { Button, Form, Input, Icon, Modal, message, InputNumber, Checkbox, Row, Col, Popover } from 'zcy-antd'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { AgencyModal } from 'components-common'
import './index.less'
import logo from '../assets/logo.png'
import { submit, sendVerifyCode, checkUserCategor, quickSubmit, getEnvHref } from '../modules/index'

class register extends Component {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    router: PropTypes.shape
  }

  loginPath = ''

  componentDidMount() {
    const { params, location } = this.props
    const pathName = location.pathname
    getEnvHref().then((res) => {

      this.loginPath = res.result.login
      debugger
    })
  }

  //弹框
  state = {
    formItemLayout: {
      labelCol: {
        span: 9
      },
      wrapperCol: {
        span: 15
      }
    },
    modalVisible: false,
    modalType: '',
    loginShow: 'none'
  }

  //点击保存
  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.warning('请完善数据')
        return
      }
      this.setState({
        modalType: 'register',
        modalVisible: true,
        onOk: () => { this.onSaveOk(values) }
      })
    })
  }

  //保存弹框确认
  onSaveOk = (formData) => {
    formData.region = formData.region[formData.region.length - 1]

    submit(formData).then(() => {
      message.success('注册成功')
      this.setState({
        modalVisible: false
      })
    }, () => {
      message.error('注册失败')
      this.setState({
        modalVisible: false
      })
    })
  }

  //验证码
  getVerifyCode = () => {

    const { getFieldValue } = this.props.form
    let mobile = getFieldValue('mobile')
    sendVerifyCode({ mobile })
  }

  //密码校验
  checkPass = (rule, value, callback) => {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['passwordSure'], { force: true });
    }
    callback();
  }
  //密码校验
  checkPass2 = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('password')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }
  //checkbox必填
  checkBoxVali = (rule, value, callback) => {
    if (!value) {
      callback('必填')
    } else {
      callback()
    }
  }

  //校验号码是否注册
  checkUser = (rule, value, callback) => {
    if (!value) {
      callback()
      return
    }
    if (value.length === 11) {
      checkUserCategor({ mobile: value }).then((result) => {
        if (result === 2) {        //已注册为分支机构
          this.setState({
            loginShow: 'inline',
            popoverVisible: false
          })
        } else if (result === 1) { //已注册为其他身份
          this.setState({
            popoverVisible: true,
            loginShow: 'none'
          })
        } else {                  //未注册
          this.setState({
            loginShow: 'none',
            popoverVisible: false,
          })
        }
      })
    } else {
      this.setState({
        loginShow: 'none',
        popoverVisible: false,
      })
    }
    callback()
  }

  popCancel = () => {
    this.setState({
      popoverVisible: false
    })
  }

  //已有账号注册
  popSure = () => {
    this.props.form.validateFieldsAndScroll(['mobile', 'fullName', 'region', 'checkbox'], (errors, values) => {
      if (!!errors) {
        message.warning('请完善数据')
        return
      }
      values.region = values.region[values.region.length - 1]

      quickSubmit(values).then(() => {
        message.success('注册成功')
        this.setState({
          popoverVisible: false
        })
      }, () => {
        message.error('注册失败')
      })
    })
  }

  render() {
    const { getFieldProps } = this.props.form
    console.log(this.loginPath)
    const userName = getFieldProps('userName', {
      rules: [...ZCYValidate.required, ZCYValidate.minLen(4), ZCYValidate.maxLen(20)]
    })
    const fullName = getFieldProps('fullName', {
      rules: [...ZCYValidate.required,
      ZCYValidate.maxLen(60)]
    })
    const mobile = getFieldProps('mobile', {
      rules: [
        ...ZCYValidate.required,
        ...ZCYValidate.mobile,
        { validator: this.checkUser }
      ]
    })
    const password = getFieldProps('password', {
      rules: [...ZCYValidate.required,
      ZCYValidate.maxLen(16),
      ZCYValidate.minLen(8),
      { validator: this.checkPass }]
    })
    const passwordSure = getFieldProps('passwordSure', {
      rules: [...ZCYValidate.required,
      ZCYValidate.maxLen(16),
      ZCYValidate.minLen(8),
      { validator: this.checkPass2 }]

    })
    const verifyCode = getFieldProps('verifyCode', {
      rules: [
        ...ZCYValidate.required,
        ...ZCYValidate.number,
        { len: 6, message: '长度为6位' },]
    })
    const region = getFieldProps('region', {
      rules: [...ZCYValidate.required]
    })
    const checkbox = getFieldProps('checkbox', {
      rules: [
        { validator: this.checkBoxVali }]
    })

    const content = (
      <div>
        <p>您已经是平台用户，是否成为代理机构？</p>
        <div className="zcy-mt">
          <a style={{ marginLeft: 180 }} onClick={this.popSure}>确认</a>
          <a className='zcy-ml' onClick={this.popCancel}>取消</a>
        </div>

      </div>
    )

    const { formItemLayout, modalVisible, modalType, loginShow } = this.state
    return (
      <div className="register">
        <div className="wrap">
          <Row type="flex" align="middle">
            <Col span={5}>
              <img src={logo} alt="" style={{ height: 47 }} />
            </Col>
            <Col style={{ marginLeft: 5 }} span={6}>
              <span>欢迎注册成为代理机构</span>
            </Col>
          </Row>
          <AgencyModal
            visible={this.state.modalVisible}
            modalType={this.state.modalType}
            onOk={this.state.onOk}
            onCancel={() => { this.setState({ modalVisible: false }) }}
          ></AgencyModal>
          <Form horizontal className="form">
            <Form.Item
              {...formItemLayout}
              label="账号"
              required
              hasFeedback
              className="account"
            >
              <Input placeholder="请输入" {...userName} />
              <p className="text">默认为机构管理员</p>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="设置密码"
              required
              hasFeedback
            >
              <Input type="password" placeholder="请输入" {...password} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="确认密码"
              required
              hasFeedback
            >
              <Input type="password" placeholder="请输入" {...passwordSure} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="中介代理机构名称（全称）"
              required
              hasFeedback
            >
              <Input placeholder="请输入" {...fullName} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="营业执照登记机关所属区划"
              required
              type="district"
              className="district"
            >
              <Address
                type="district"
                {...region}
                ref="address"
              />
              <span className="text">按营业执照登记机关,如省工商管理局为省本级,市、区(县)工商管理局为对应市本级和区(县)</span>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="手机"
              required
              hasFeedback
            >
              <Input placeholder="请输入" {...mobile} />
              <span style={{ display: loginShow, marginLeft: 10 }}>您已经是代理机构，可<a href={this.loginPath}>直接登录</a></span>
              <Popover content={content} trigger="click" placement="bottomLeft"
                visible={this.state.popoverVisible} onVisibleChange={this.handleVisibleChange}
              >
                <span className='zcy-ml'></span>
              </Popover>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="验证码"
              required
              className="verify"
            >
              <Input placeholder="请输入6位验证码" {...verifyCode} />
              <Button onClick={this.getVerifyCode} className="verify-button">获取验证码</Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 16, offset: 9 }}
            >
              <Checkbox {...checkbox} /><span>本人已阅读同意<Link to="/registerPolicy">《代理机构注册需知及承诺事项》</Link></span>
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 12, offset: 9 }}
            >
              <Button  onClick={this.onSubmit}>注册</Button>
            </Form.Item>
          </Form>
        </div>
      </div >
    )
  }
}

register = Form.create({
  // mapPropsToFields(props) {
  //   return props.data;
  // }
})(register);

export default register
