import React, { Component } from 'react'
import { ZCYContainer, ZCYPanel } from 'zcy-common'
import PropTypes from 'prop-types'
import './style.less'

// 1. url传参
// 2. 进入路径时dispatch img-url
export default class WriteExplain extends Component {
  componentDidMount() {
    this.props.init()
  }

  render() {
    return (
      <ZCYContainer>
        <ZCYPanel>
          {/* <ZCYPanel.Header title={title} /> */}
          <ZCYPanel.Header title="填写案例" />

          <ZCYPanel.Body>
            <div className="img-container">
              {/* <img src={{ imgUrl }} alt={imgAlt} /> */}
              <img
                src="https://os.alipayobjects.com/rmsportal/GhjqstwSgxBXrZS.png"
                alt="antd"
              />
            </div>
          </ZCYPanel.Body>
        </ZCYPanel>
      </ZCYContainer>
    )
  }
}

// const WriteExplain = ({ title, imgUrl, imgAlt }) => {
//   return (
//     <ZCYContainer>
//       <ZCYPanel>
//         <ZCYPanel.Header title={title} />
//         <ZCYPanel.Body>
//           {' '}<div>
//             <img src={{ imgUrl }} alt={imgAlt} />
//           </div>{' '}
//         </ZCYPanel.Body>
//       </ZCYPanel>
//     </ZCYContainer>
//   )
// }

// WriteExplain.propTypes = {
//   title: PropTypes.string,
//   imgUrl: PropTypes.string,
//   imgAlt: PropTypes.string
// }

// export default WriteExplain
