import axios from 'axios';

/**
 * 当前层级是否被选中
 * 地址区划数据中，非00表示有选中
 * @param {String} code
 */
function isSelected(code) {
  return code !== '00'
}

/**
 * 判断是否是地址
 * @param {String} type
 */
export function isAddress(type) {
  return type === 'address'
}

/**
 * 根据城市的编码最后两位不是00来判断是否是直辖市
 * @param {String} cityCode
 */
function isMunicipality(cityCode) {
  if (!cityCode || cityCode.length != 6) {
    return false
  }
  // 4-6位数据是否是00
  return isSelected(cityCode.substring(4, 6))
}

/**
 * 根据code来初始化当前的数据选择
 * 需要根据省市区对应的值是否存在，来决定是否需要初始化对应的数据
 * @param {String} code
 */
export function getValueFormCode(code) {
  if (!code) {
    return false
  }

  if (typeof code === 'number') {
    code += ''
  }

  if (code.length != 6) {
    return false
  }

  const prov = code.substring(0, 2)
  const city = code.substring(2, 4)
  const region = code.substring(4, 6)

  if (!isSelected(prov)) {
    return false
  }

  // 城市未选中
  if (!isSelected(city)) {
    return [prov + '0000']
  }

  // 市区未选中
  if (!isSelected(region)) {
    return [prov + '0000', prov + city + '00']
  }

  return [
    prov + '0000',
    prov + city + '00',
    code
  ]
}

/**
 * 调用接口获取对应的地址区划数据
 * @param {String} type
 * @param {String} selectedOption
 */
export function getOptions(type, code) {
  // 地址
  
  if (isAddress(type)) {
    const url = `/api/address/${code || 0}/children`
    return axios.get(url).then((children) => {
      // 还有子节点
      if (children.length) {
        return children.map((node) => {
          return {
            value: node.id + '',
            label: node.name,
            // 由于地址数据没有children属性，需要根据level来判断
            // level中还有4级的街道，后期可根据需求来决定是否开放
            isLeaf: node.level >= 3,
          }
        })
      }
      return []
    })
  }

  // 区划
  let params = {deep: 1}
  if (code) {
    params.pid = code
  }
  return axios.get('/api/district/getDistrictTree', { params })
    .then((resp) => {
      const data = resp.data[0]
      const children = data ? data.children : []

      // 不是叶子节点
      if (!!children) {
        return children.map((node) => {
          return {
            id: node.id,
            value: node.code,
            label: node.text,
            isLeaf: !node.children,
          }
        })
      }
      // 叶子节点
      return children
    })
}

/**
 * 根据id获取数组内对应元素
 * @param {String} type
 * @param {Array} options
 * @param {String} value
 */
function getCurrentOption(options, value) {
  if (!options || !value) {
    return
  }

  return options.find((item) => {
    return item.value == value
  })
}

/**
 * 根据code查询选项的树形结构
 * @param {String} type
 * @param {String} code
 */
export function getOptionsTree(type, value=[]) {
  const provPromise = getOptions(type, 0)
  // if (!value) {
  //   return provPromise.then((options) => [options])
  // }
  //  value = getValueFormCode(value)
  // if (!value) {
  //   return provPromise.then((options) => [options])
  // }

  // 根据getValueFormCode prov一定存在
  let prov = value[0]
  let city = value[1]
  let region = value[2]

  /**
   * 根据当前的数据，拼装成三级的树形结构
   */
  return provPromise.then((options) => {
    if(!(options&&options.length>0)){
      return []
    }
    if(!prov){
      return [options];
    }
    let currentProv = getCurrentOption(options, prov)
    let provCode = isAddress(type) ? prov : currentProv.id
    return getOptions(type, provCode).then((cityOptions) => {
      provCode = currentProv.value
      if (!currentProv) {
        return [options, [provCode]]
      }

      currentProv.children = cityOptions

      if (city) {
        // 如果是直辖市
        if (isMunicipality(cityOptions[0].value)) {
          return [options, [provCode, region]]
        }

        let currentCity = getCurrentOption(cityOptions, city)
        let cityCode = isAddress(type) ? city : currentCity.id
        return getOptions(type, cityCode).then((regionOptions) => {
          if (!currentCity) {
            return [options, [provCode, city]]
          }

          currentCity.children = regionOptions

          return [options, [provCode, city, region]]
        })
      }
    })
  })
}