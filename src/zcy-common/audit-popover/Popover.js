/**
 * 在特定区域中标注审批信息
 * @param:text
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Popover, Button, Checkbox, Input, Form, message } from 'zcy-antd'
import classNames from 'classnames';
import ZCYUtils from '../zcy-utils'
import TextareaLimited from './textarea'
import './Popover.less'
const FormItem = Form.Item

class AuditPopover extends Component {
  static defaultProps = {
    text: '',
    title: '审批意见',
    placement: 'bottom',
    trigger: 'click',
    areaMaxLen: 100
  }

  state = {
    visible: false,
    errorText: '有错误',
    checked: false,
    showPopover: false,
  }

  static contextTypes = {
    auditType: React.PropTypes.string
  }

  remark = '有错误'

  hide = () => {
    this.setState({
      visible: false
    })
  }

  handleSubmit = () => {
    //e.preventDefault()
    console.log('收到的错误信息：', this.remark)
    if(!this.remark) {
      message.error('请输入审批信息');
      return
    }
    this.setState({
      visible: false,
      errorText: this.remark
    })
    this.props.setAgencyAuditInfo({
      key: this.context.auditType,
      [this.props.name]: this.remark
    })
  }

  handleVisibleChange = visible => {
    let cookieVisible = ZCYUtils.getCookie('auditPopVisible') === 'false';
    if (cookieVisible) {
      return
    }
    this.setState({ visible, checked: visible })
    // console.log(visible)
  }

  handleRemark = e => {
    this.remark = e.target.value
    // console.log(this.remark)
  }
  
  mouseEnter = () => {
    let cookieVisible = ZCYUtils.getCookie('auditPopVisible') === 'false';
    if (cookieVisible) {
      return
    }
    this.setState({
      showPopover: true
    })
  }

  mouseOut = () => {
    const { checked } = this.state
    this.setState({
      showPopover: checked
    })
  }

  onChangeCheckbox = () => {
    let cookieVisible = ZCYUtils.getCookie('auditPopVisible') === 'false';
    if (cookieVisible) {
      return
    }
    if (!this.state.checked) {
      this.handleSubmit()
    }
    this.setState({
      checked: !this.state.checked
    })
  }

  componentWillReceiveProps(nextProps) {
    const { auditType } = this.context
    let keys = auditType.split('.');
    let tmp;
    if (nextProps.agencyAuditInfo[keys[0]]) {
      tmp = nextProps.agencyAuditInfo[keys[0]]
      for(let i = 1, len = keys.length; i < len; i++) {
        tmp = tmp[keys[i]]
        if (!tmp) {
          break;
        }
      }
      if (tmp && tmp[this.props.name]) {
        this.setState({
          showPopover: true,
          checked: true,
          errorText: tmp[this.props.name]
        })
      }  
    }
  }

  render() {
    const {
      text,
      title,
      placement,
      trigger,
      areaMaxLen,
      agencyAuditInfo,
      ...restProps
    } = this.props
    const { visible, errorText, checked, showPopover } = this.state

    let checkboxCls = classNames({
      'error-check': true,
      'checked': checked,
      'error-check-hide': ZCYUtils.getCookie('auditPopVisible') === 'false'
    })
    return (
      <div
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseOut}
        className="audit-error-content"
      >
        {text}
        {showPopover &&
          <Checkbox
            checked={checked}
            onChange={this.onChangeCheckbox}
            className={checkboxCls}
          >
            <Popover
              {...restProps}
              content={
                <div>
                  <Form>
                    <FormItem>
                      <TextareaLimited
                        max={areaMaxLen}
                        handleRemark={this.handleRemark.bind(this)}
                      />
                    </FormItem>
                    <Button type="primary" onClick={this.handleSubmit}>
                      确认
                    </Button>
                    <Button onClick={this.hide}>关闭</Button>
                  </Form>
                </div>
              }
              title={title}
              placement={placement}
              trigger={trigger}
              overlayClassName="audit-popover"
              visible={visible}
              onVisibleChange={this.handleVisibleChange}
            >  
              <span title={errorText}>
                {errorText}
              </span>             
            </Popover>
          </Checkbox>
        }
      </div>
    )
  }
}

export default AuditPopover
