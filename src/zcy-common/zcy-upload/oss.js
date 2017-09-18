import moment from 'moment';
import axios from 'axios';

/**
 * 由于超时时间为15分钟
 * 所以分钟差在15 到 30分之内则符合
 **/
function isClientTimeValid (time) {
  let diff = moment(time).diff(new Date(), 'minute')
  return diff >= 0 && diff <= 30
}

/**
 * 去除特殊字符
 * 文件名存在特殊字符会导致文件下载失败
 */
function trim(str){
  if (!str) {
    return ''
  }
  return str.replace(/\ /g, '')
            .replace(/\>/g, '')
            .replace(/\,/g, '')
            .replace(/\</g, '')
}

/**
 * 裁剪文件名称的最大长度
 * 过滤特殊字符
 * 如果超出，则自动裁剪
 */
// todo suffix后缀 undefined
function cutFileName(name, maxLength) {
  let filename = trim(name)
  if (filename.length > maxLength) {
    let splitArray = filename.split('.')
    const nameLength = maxLength - suffix.length + 1
    filename = `${splitArray[0].substring(nameLength)}.${splitArray[1]}`
  }
  return filename
}

/**
 * 获取上传文件的口令
 * @param {String} bizCode 业务id
 * @param {String} userId 当前用户id
 * @param {String} realName 真实的文件名称
 * @param {Number} maxLength 文件名最大长度
 * @param {Number} fileNum 文件数量
 */
export function getKey(bizCode, userId, realName, maxLength = 100, fileNum = 1) {
  if (!window.FormData) {
    return Promise.resolve({
      action: '/api/zoss/upload',
      name: 'zossfile',
      data: {
        bizCode,
        userId,
      }
    })
  }

  // 文件名进行裁剪，并且url编码，防止ie下载时的中文乱码
  const filename = encodeURI(cutFileName(realName, maxLength))
  // 设置Disposition，用作oss的http返回头response，作为附件下载，而不是浏览器打开
  const Disposition = `attachment;filename=${filename};filename*=UTF-8''${filename}`
  return axios.get('/api/zoss/getOSSSignature', {
    params: {
      fileNum,
      bizCode,
      fileRealName: Disposition,
    }
  })
    .then((data) => {
      if (!data || !data.success) {
        Promise.reject(data.error || '获取上传口令失败')
        return
      }

      const token = data.result
      if (!isClientTimeValid(token.expiration)) {
        Promise.reject('您电脑时间与现在标准北京时间相差较大，请修正时间后再上传')
        return
      }

      return {
        action: token.host,
        data: (file) => {
          return {
            policy: token.policy,
            dir: token.dir,
            OSSAccessKeyId: token.accessId,
            signature: token.signature,
            success_action_status: '200',
            // 上传aliyun，自定义fileId上传
            key: `${token.dir}/${file.fileId}`,
            // 设置attachment，用于下载是，设置返回头的附件标识
            'Content-Disposition': Disposition
          }
        },
      }
    })
}

/**
 * 获取实际可访问链接
 * @param {Object} params
 *  {
 *    fileId: file.fileId,
 *    bizCode,
 *  }
 */
export function getUrl(params) {
  return axios.get('/api/zoss/getDownLoadUrl', {
    params
  }).then((resp) => {
    if (!resp || !resp.success || !resp.result) {
      Promise.reject(data.error || '获取文件链接失败')
      return
    }
    return resp.result
  })
}

/**
 * 转换文件数组对象
 * 添加状态
 * @param {Array} fileList
 */
export function transform(fileList, bizCode) {
  if (!fileList || !fileList.length) {
    return Promise.resolve([])
  }
  return Promise.all(
    fileList.map((file) => {
      if (file.url) {
        return new Promise((resolve, reject) => {
          resolve(file)
        });
      }
      return getUrl({
        fileId: file.fileId,
        bizCode,
      }).then((url) => {
        file.thumbUrl = url
        file.url = url
        file.status = 'done'
        return file
      }).catch(() => {
        file.status = 'error'
        return file
      })
    })
  )
}

/**
 * IE下获取返回的fileId
 * @param {Object} response
 */
export function setFileIdForIE(file, response) {
  if (!file
  || file.fileId
  || window.FormData
  || !response
  || !response.result
  || !response.result.fileList
  || !response.result.fileList.length) {
    return
  }
  file.fileId = response.result.fileList[0].fileId
}
