import React from 'react';
import PropTypes from 'prop-types';
import Cascader from './cascader';

import './address.less'

import {
  isAddress,
  getOptions,
  getOptionsTree,
  getValueFormCode
} from './action'

export default class Address extends React.Component {
  static defaultProps = {
    placeholder: '请选择地区',
    type: 'address',  // district
  }

  static propTypes = {
    defaultValue: PropTypes.string,
    type: PropTypes.oneOf(['address', 'district']),
  }
  state = {
    options: [],
  }
  label = []
  /**
   * 初始化数据
   * 如果存在值，则需要根据当前值解析并获取整个树形结构
   */
  // componentDidMount() {
  //   const value = this.props.value;
  //   getOptionsTree(this.props.type, value)
  //     .then((result) => {
  //       let options = result[0]
  //       let codes = result[1] || getValueFormCode(value)
  //       // 一次setState，防止多次render
  //       let state = codes ? {
  //         value: codes,
  //         options
  //       } : { options }
  //       this.setState(state)
  //       // 用来触发form的值更新
  //     });
  // }

  /**
   * 异步加载数据
   */
  loadData = (selected) => {
    const target = selected[selected.length - 1];
    target.loading = true;
    let code = isAddress(this.props.type) ? target.value : target.id
    getOptions(this.props.type, code)
      .then((options) => {
        if (!options || !options.length) {
          target.isLeaf = true
        } else {
          target.loading = false;
          target.children = options;
        }
        this.setState({
          options: [...this.state.options]
        });
      });
  }
  displayRender = (label) => {
    this.label = label.join('/');;
    return label.join('/');
  }
  onPopupVisibleChange = (popupVisible) => {
    if (this.state.options && this.state.options.length > 0 || !popupVisible) {
      return popupVisible;
    }

    getOptionsTree(this.props.type, this.props.value)
      .then((result) => {
        let options = result[0];
        this.setState({
          options
        })
      });
  }
  render() {
    let { options, ...other } = this.props;
    if (!(options && options.length > 0)) {
      options = this.state.options;
    }
    if (this.props.value && this.label.length === 0) {
      this.label = this.props.text;
    }
    let props = {
      ...other,
      loadData: this.loadData,
      options: options,
      displayRender: this.displayRender,
      onPopupVisibleChange: this.onPopupVisibleChange
    }
    return <Cascader {...props} style={{ width: 320 }} changeOnSelect />
  }
}
