import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Uploader from './uploader'

import { Modal } from 'zcy-antd'

import './index.less'

import {
  getKey,
  transform,
  setFileIdForIE,
} from './oss'

export default class ZCYUpload extends Component {
  static propTypes = {
    bizCode: PropTypes.string.isRequired,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    showOnly: PropTypes.bool,
    defaultFileList: PropTypes.array,
    fileList: PropTypes.array
  }

  state = {
    oss: null,
    defaultFileList: [],
    previewVisible: false,
    thumbUrl: '',
  }

  /**
   * 上传之前
   * 请求oss相关的属性值，在上传的时候传给oss
   */
  beforeUpload = (file) => {
    if (!file) {
      return
    }
    if (this.props.beforeUpload) {
      if (!this.props.beforeUpload(file)) {
        return false
      }
    }
    return getKey(this.props.bizCode, this.props.userId, file.name)
      .then((oss) => {
        this.setState({
          oss,
        })
      })


  }

  onPreview = (file) => {
    this.setState({
      thumbUrl: file.thumbUrl,
      previewVisible: true,
    })
  }

  handlePreview = (file, e) => {
    const onPreview = this.props.onPreview || this.onPreview
    e.preventDefault();
    return onPreview(file);
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
    let files = this.props.fileList
    // 转换数据，生成预览链接
    transform(files, this.props.bizCode).then((fileList) => {
      this.setState({
        fileList,
      })
      // 触发onchange，用于表单的校验
    })
  }

  componentWillReceiveProps(nextProps) {
    //数据异步获取，使用flag标志判断，若所有数据拥有url或者thumbUrl，不再尽心刷新
    let files = nextProps.fileList;
    if (files && !this.props.fileList) {
      transform(files, this.props.bizCode).then((fileList) => {
        this.setState({
          fileList,
        })
      })
    }
    // let flag = false;
    // files && files.length && files.map((file, index) => {
    //   if (!file.url || !file.thumbUrl) {
    //     flag = true
    //   }
    // })
    // if (flag) {
    //   transform(files, this.props.bizCode).then((fileList) => {
    //     this.setState({
    //       fileList,
    //     })
    //   })
    // }
  }

  render() {
    if (this.props.defaultFileList && this.props.defaultFileList.length && (!this.state.fileList || !this.state.fileList.length)) {
      return <span></span>
    }

    let props = {
      ...this.props,
      ...this.state.oss,
      defaultFileList: this.state.fileList,
      beforeSuccess: setFileIdForIE,
      beforeUpload: this.beforeUpload,
      onPreview: this.props.onPreview || this.onPreview,
    };

    return (
      <span>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
          <img src={this.state.thumbUrl} ref="previewImage" onLoad={this.handleLoad} className="full-width"/>
        </Modal>
        <Uploader {...props}/>
      </span>
    )
  }
}
