import React, {Component} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Input, Icon } from 'zcy-antd';
import './ZCYSearch.less';

export default class ZCYSearch extends Component {
  static defaultProps = {
    prefixCls: 'zcy-input-search'
  }

  static propTypes = {
  }

  onSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.refs.input.value);
    }
    this.input.refs.input.focus();
  }

  render() {
    const { prefixCls, className, style, ...props } = this.props;
      
    return (
      <div className={`${prefixCls}-wrap`} style={style}>
        <Input 
          className={classNames(prefixCls, className)}
          ref={node => this.input = node} 
          onPressEnter={this.onSearch}
          {...props}
          />
        <span className={`${prefixCls}-suffix-wrap`}>
          <Icon type="search" className={`${prefixCls}-icon`} onClick={this.onSearch}></Icon>
        </span>
      </div>
    )
  }
}