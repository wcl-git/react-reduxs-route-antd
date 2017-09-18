/**
 * Created by chenkaixia on 2017/7/31.
 */
import React from 'react'
import {DatePicker} from 'zcy-antd'
export default class RangePicker extends React.Component {

  DateChange = (value)=>{
    let _value0 =new Date(value[0]);
    let _value1 = new Date(value[1]);
    let arr = [_value0.getTime(),_value1.getTime()]
    this.props.onChange&&this.props.onChange(arr)
  }

  render() {
    let { onChange, value, ...props} = this.props;
    value = value ? [new Date(parseInt(value[0],10)),new Date(parseInt(value[1],10))] : null;

    return (<DatePicker.RangePicker {...props} value={value}  onChange={this.DateChange} />)
  }

}