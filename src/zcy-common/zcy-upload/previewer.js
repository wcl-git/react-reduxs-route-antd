
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, Icon } from 'zcy-antd'

import { getUrl } from './oss'

export default class Previewer extends Component {
  static propTypes = {
    bizCode: PropTypes.string.isRequired,
    // fileId和fileUrl必须有一个
    fileId: PropTypes.string,
    fileUrl: PropTypes.string,
    previewText: PropTypes.string,
  }

  static defaultProps = {
    previewText: '预览'
  }

  state = {
    previewVisible: false,
    thumbUrl: '',
  }

  onPreview = () => {
    this.setState({
      previewVisible: true,
    })
  }

  handlePreview = () => {
    const onPreview = this.props.onPreview || this.onPreview
    return onPreview(this.state.thumbUrl)
  }

  /**
   * 图片加载完成后
   * 根据图片的实际宽高，动态计算更合理的modal的宽高
   */
  handleLoad = () => {
    const img = this.refs.previewImage
    if (!img) {
      return
    }
    this.setState({
      dimensions: {
        height: img.offsetHeight,
        width: img.offsetWidth,
      }
    })
  }

  // 关闭预览
  handlePreviewCancel= () => {
    this.setState({previewVisible: false})
  }

  componentDidMount() {
    // 如果实际路径已经存在，不需要再请求
    if (this.props.fileUrl) {
      this.setState({thumbUrl: this.props.fileUrl})
      return
    }

    debugger
    if (this.props.fileId) {
      getUrl({
        fileId: this.props.fileId,
        bizCode: this.props.bizCode,
      }).then((thumbUrl) => {
        this.setState({ thumbUrl })
      }).catch((e) => {
        console.error('Get oss file url error', e)
      })
    }
  }

  render() {
    return (
      <span className="zcy-oss-file">
        <Icon type="eye-o" className="zcy-oss-file-icon"/>
        <span className="zcy-oss-file-text" onClick={this.handlePreview}>{this.props.previewText}</span>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
          <img src={this.state.thumbUrl} ref="previewImage" onLoad={this.handleLoad} className="full-width"/>
        </Modal>
      </span>
    )
  }
}