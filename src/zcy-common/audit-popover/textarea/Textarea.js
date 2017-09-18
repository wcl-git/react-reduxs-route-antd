/**
 * 输入域输入有长度限制
 * params(string):max
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'zcy-antd'
import './Textarea.less'

class TextareaLimited extends Component {
  static defaultProps = {
    max: 100
  }

  constructor(props) {
    super(props)
    // console.log(props)
    const { max } = props
    this.state = {
      max: max,
      num: 0
    }
  }
  keydown = e => {
    const _l = e.target.value.length
    // console.log(_l)
  }
  change = e => {
    const _l = e.target.value.length
    this.props.handleRemark(e)
    this.setState({ num: _l })
  }
  render() {
    const { max, num } = this.state
    return (
      <div className="textarea-limited">
        <Input
          type="textarea"
          placeholder="请输入意见"
          maxLength={max}
          onChange={this.change}
          onKeyDown={this.keydown}
          onKeyUp={this.change}
        />
        <p className="num-limited">
          {num}/{max}
        </p>
      </div>
    )
  }
}

export default TextareaLimited
