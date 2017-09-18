
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'zcy-antd'

import { getUrl } from './oss'

export default class Downloader extends Component {
  static propTypes = {
    bizCode: PropTypes.string.isRequired,
    // fileId和fileUrl必须有一个
    fileId: PropTypes.string,
    fileUrl: PropTypes.string,
    downText: PropTypes.string,
  }

  static defaultProps = {
    downText: '下载'
  }

  state = {
    url: '',
  }

  handleDownload = () => {
    this.refs.ifile.src = this.state.url
  }

  componentDidMount() {
    // 如果实际路径已经存在，不需要再请求
    if (this.props.fileUrl) {
      this.setState({url: this.props.fileUrl})
      return
    }

    if (this.props.fileId) {
      getUrl({
        fileId: this.props.fileId,
        bizCode: this.props.bizCode,
      }).then((url) => {
        this.setState({ url })
      }).catch((e) => {
        console.error('Get oss file url error', e)
      })
    }
  }

  render() {
    return (
      <span className="zcy-oss-file">
        <Icon type="download" className="zcy-oss-file-icon" />
        <span className="zcy-oss-file-text" onClick={this.handleDownload}>{this.props.downText}</span>
        <iframe ref="ifile" src="" className="hide"></iframe>
      </span>
    )
  }
}