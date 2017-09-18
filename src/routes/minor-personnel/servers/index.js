import { request, Address } from 'zcy-common'

export const getFormDataApi = (id) => {
  return request('/agencymng/ageemployee/detail', {
    method: 'get',
    params: { id }
  }).then((res) => {
    let data = {}
    for (let key in res) {
      data[key] = {
        value: res[key]
      }
    }

    const mapEducateLevel = {
      12: '博士后',
      13: '博士',
      14: '硕士',
      28: '相当大学毕业',
      31: '专科毕业',
      61: '高中毕业',
      20: '大学本科'
    }

    data.educateLevel.text = mapEducateLevel[data.educateLevel.value]

    const mapType = {
      4: '业务联系人',
      41: '授权代表 ',
      42: '册联系人',
      43: '协议定点项目协调人',
      5: '专业(业务)人员',
      51: '订单受理',
      59: '客户服务',
      7: '信息安全专员',
      9: '其他',
      52: '仓库商品收发',
      53: '物流运输',
      54: '安装服务',
      55: '发票管理',
      56: '到款确认',
      57: '售后服务',
      58: '维修服务',
      '5A': '执业人员',
    }
    data.type && (data.type.text = mapType[data.type.value])
    data.area = {
      text: data.districtFullName.value,
      value: [data.prov.value, data.city.value, data.dist.value]
    }
    const sexRadioMap = {
      0: '男',
      1: '女'
    }
    data.gender && (data.gender.text = sexRadioMap[data.gender.value])
    if (!data.AGE_ORG_EMPLOYEE_PHOTO) {
      data.AGE_ORG_EMPLOYEE_PHOTO = {}
      data.AGE_EMPLOYEE_CARDID = {}
      data.AGE_ORG_EMPLOYEE_PHOTO.value = data.filemanageMaps.value.AGE_ORG_EMPLOYEE_PHOTO
      data.AGE_EMPLOYEE_CARDID.value = data.filemanageMaps.value.AGE_EMPLOYEE_CARDID
    }
    return data
  })
}

export const saveFormDataApi = (params) => {
  return request('/agencymng/ageemployee/save', {
    method: 'post',
    data: params
  })
}

