import React, { Component } from 'react'
import { Print } from 'zcy-antd'
import { agencyPrintAPI } from '../services'
let template = require('./template.hbs')

import './template.less'

export default class AgencyPrint extends Component {
  constructor(props) {
    super(props)
    this.state = {
      printTmpl: '',
      printTmplState: false
    }
  }

  hanlerPrintData = () => {
    agencyPrintAPI().then(data => {
      console.log(data)
      let _PRINT_ = data
      let szResult = template({
        _PRINT_
      })

      this.setState({
        printTmpl: szResult,
        printTmplState: true
      })
    })
  }

  render() {
    return (
      <Print
        printTmpl={this.state.printTmpl}
        printTmplState={this.state.printTmplState}
        hanlerPrintData={this.hanlerPrintData}
      >
        <a href="javascript:;">打印申请</a>
      </Print>
    )
  }
}
