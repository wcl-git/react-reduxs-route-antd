## modal-form

### Usage
```jsx
import React, { Component } from 'react'
import { ModalForm } from 'zcy-common'

class DEMO extends Component{
  searchSubmit(err, values){
    console.log(err, values)
    //post data
  }

  render(){
    <ModalForm
      trigger={<span>触发</span>}
      modalName="高级搜索(默认)"
      onSubmit={this.searchSubmit}
      okText="搜索"
      cancelText="重置"
    />
  }
}
```
