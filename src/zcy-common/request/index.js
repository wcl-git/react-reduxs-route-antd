import axios from 'axios'

import eventEmitter from '../eventEmitter/index'
axios.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response && (error.response.status === 400 || error.response.status === 403 )) {
      eventEmitter.emitEvent('ajaxWarning', error.response.message)
    }
    if(error.response &&error.response.status === 403){
      window.location.href=error.response.message;
    }
    if(error.response && error.response.status === 500){
      eventEmitter.emitEvent('ajaxError', error.response)
    }
    return Promise.reject(error)
  }
)

axios.defaults = {
  validateStatus(status) {
    return status >= 200 && status < 300
  },
  timeout: 10000
}

function request(url, params) {
  let options = {
    url,
    ...params
  }

  return axios(options)
}

export default request
