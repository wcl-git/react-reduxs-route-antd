import React from 'react';
import Animate from 'rc-animate';
const prefixCls = 'ant-upload';
import classNames from 'classnames';
import { getUrl } from '../oss';
import { Progress, Icon } from 'zcy-antd';

// https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
const previewFile = (file, callback) => {
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
};

export default class UploadList extends React.Component {
  static defaultProps = {
    listType: 'text',  // or picture
    items: [],
    showOnly: false,
    progressAttr: {
      strokeWidth: 3,
      showInfo: false,
    },
  };

  handleClose = (file) => {
    this.props.onRemove(file);
  }

  handlePreview = (file, e) => {
    if (this.props.onPreview) {
      e.preventDefault();
      return this.props.onPreview(file);
    }
  }

  handleDownload = (file) => {
    // 还在上传中，或者没有url地址，不进行下载
    if (file.status !== 'done' || (!file.url && !file.fileId)) {
      return false
    }

    if (!file.url) {
      getUrl({
        bizCode: this.props.bizCode,
        fileId: file.fileId
      }).then((url) => {
        file.thumbUrl = url
        file.url = url
        this.refs.ifile.src = file.url
      })
    } else {
      this.refs.ifile.src = file.url
    }
  }

  componentDidUpdate() {
    if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
      return;
    }
    this.props.items.forEach(file => {
      if (typeof document === 'undefined' ||
          typeof window === 'undefined' ||
          !window.FileReader || !window.File ||
          !(file.originFileObj instanceof File) ||
          file.thumbUrl !== undefined) {
        return;
      }
      if (window.FormData) {
        /*eslint-disable */
        file.thumbUrl = '';

        /*eslint-enable */
        previewFile(file.originFileObj, (previewDataUrl) => {
          /*eslint-disable */
          file.thumbUrl = previewDataUrl;
          /*eslint-enable */
          this.forceUpdate();
        });
      }
    });
  }

  render() {
    let list = this.props.items.map((file, index) => {
      let progress;
      let icon = <Icon type="paper-clip" />;
      if (this.props.listType === 'picture' || this.props.listType === 'picture-card') {
        if (window.FormData && (file.status === 'uploading' || (!file.thumbUrl && !file.url))) {
          if (this.props.listType === 'picture-card') {
            icon = <div className={`${prefixCls}-list-item-uploading-text`}>文件上传中</div>;
          } else {
            icon = <Icon className={`${prefixCls}-list-item-thumbnail`} type="picture" />;
          }
        } else {
          icon = window.FormData
          ? (
            <div
              className={`${prefixCls}-list-item-thumbnail`}
              //onClick={e => this.handlePreview(file, e)}
              href={file.url}
              target="_blank"
            >
              { window.FormData && <img src={file.thumbUrl || file.url} alt={file.name}/> }
            </div>
          ) : (
            <div
              style={{
                filter:`progid:DXImageTransform.Microsoft.AlphaImageLoader(src='${file.thumbUrl}', sizingMethod='scale')`
              }}
              className={`${prefixCls}-list-item-thumbnail`}
              //onClick={e => this.handlePreview(file, e)}
              >
            </div>
          );
        }
      }

      if (file.status === 'uploading') {
        progress = (
          <div className={`${prefixCls}-list-item-progress`}>
            <Progress type="line" {...this.props.progressAttr} percent={file.percent} />
          </div>
        );
      }
      const infoUploadingClass = classNames({
        [`${prefixCls}-list-item`]: true,
        [`${prefixCls}-list-item-${file.status}`]: true,
      });
      return (
        <div className={infoUploadingClass} key={file.fileId + index}>
          <div className={`${prefixCls}-list-item-info`}>
            {icon}
                <span
                  className={`${prefixCls}-list-item-name`}
                  //onClick={e => this.handlePreview(file, e)}
                >
                  {file.name}
                </span>
            {
              this.props.listType === 'picture-card' && file.status !== 'uploading'
              ? (
                <span>
                  <a
                    href={file.url}
                    target="_blank"
                    //style={{ pointerEvents: file.url ? '' : 'none' }}
                    onClick={e => this.handlePreview(file, e)}
                  >
                    <Icon type="eye-o" />
                  </a>

                  {
                    this.props.showOnly
                    ? (
                      (file.url || file.fileId) && <Icon type="download" onClick={() => this.handleDownload(file)} />
                    )
                    : <Icon type="delete" onClick={() => this.handleClose(file)} />
                  }
                </span>
              )
              : (
                this.props.listType === 'picture' && file.status !== 'uploading' 
                ? (<span>
                    { 
                      !this.props.showOnly && <Icon type="cross" onClick={() => this.handleClose(file)} />
                    }
                    <span className={`${prefixCls}-list-picture-operation`}>
                      {
                        this.props.listType === 'picture' && file.status !== 'uploading' 
                        ? <Icon type="eye-o" onClick={e => this.handlePreview(file, e)} /> 
                        : null
                      }
                      { 
                        this.props.showOnly 
                        ? (
                          (file.url || file.fileId) && <Icon type="download" className="zcy-ml" onClick={() => this.handleDownload(file)} /> 
                        )
                        : null
                      }
                    </span>
                  </span>
                ) : (
                  this.props.showOnly
                  ? (
                    (file.url || file.fileId) && <Icon type="download" onClick={() => this.handleDownload(file)} />
                  )
                  : <Icon type="cross" onClick={() => this.handleClose(file)} />
                )
              )
            }
          </div>
          <iframe ref="ifile" src="" className="hide"></iframe>
          {progress}
        </div>
      );
    });
    const listClassNames = classNames({
      [`${prefixCls}-list`]: true,
      [`${prefixCls}-list-${this.props.listType}`]: true,
    });
    return (
      <div className={listClassNames}>
        <Animate transitionName={`${prefixCls}-margin-top`}>
          {list}
        </Animate>
      </div>
    );
  }
}