/**
 * Created by chenkaixia on 2017/7/24.
 */
import React from 'react'
import {DatePicker} from 'zcy-antd'
import RangePicker from  './RangePicker'
export default class ZCYDatePicker extends React.Component {

  DateChange = (value)=>{
    let _value =new Date(value);
    this.props.onChange(_value.getTime())
  }

  render() {
    let { onChange, value, ...props} = this.props;
    value = value ? new Date(parseInt(value,10)) : null;
    return (<DatePicker {...props} value={value}  onChange={this.DateChange} />)
  }

}

ZCYDatePicker.RangePicker = RangePicker;