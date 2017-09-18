import { request, Address } from 'zcy-common'

//详情
export const getFormDataApi = (params) => {
  return request('/agencymng/ageperformance/detail', {
    method: 'get',
    params: { 
      ...params 
    }
  }).then((res) => {
    let data = {}
    for (let key in res) {
      if (key === 'proUserId') {
        data[key] = {
          value: {
            value: res[key],
            label: res['handleName']
          }
        }
      } else if (key === 'dealAmount' || key === 'budgetAmount') {
        data[key] = {
          value: res[key] /= 1000000
        }
      } else {
        data[key] = {
          value: res[key]
        }
      }
    }
    data.area = {
      text: data.districtFullName.value,
      value: [data.companyProv.value, data.companyCity.value, data.companyDist.value]
    }
    //使下步可赋值
    if (!data.AGE_PERFORMANCE_CONTRACT) {
      data.AGE_PERFORMANCE_CONTRACT = {}
    }
    if (!data.AGE_PERFORMANCE_BIDNOTICE) {
      data.AGE_PERFORMANCE_BIDNOTICE = {}
    }
    if (!data.AGE_PERFORMANCE_PURCHASE) {
      data.AGE_PERFORMANCE_PURCHASE = {}
    }

    //将附件数组对象值拿出
    if (data.filemanageMaps) {
      data.AGE_PERFORMANCE_CONTRACT.value = data.filemanageMaps.value.AGE_PERFORMANCE_CONTRACT
      data.AGE_PERFORMANCE_BIDNOTICE.value = data.filemanageMaps.value.AGE_PERFORMANCE_BIDNOTICE
      data.AGE_PERFORMANCE_PURCHASE.value = data.filemanageMaps.value.AGE_PERFORMANCE_PURCHASE
    }

    const mapProjectType = {
      perform_type_project: '工程类',
      perform_type_service: '服务类',
      perform_type_goods: '货物类',
    }

    const mapPurchaseWay = {
      perform_procure_open: '公开招标',
      perform_procure_negotiate: '竞争性谈判',
      perform_procure_single: '单一来源采购',
      perform_procure_enquiry: '询价采购',
      perform_procure_invite: '邀请招标',
      performance_invited_negotiate: '竞争性磋商',
    }

    data.projectType.text = mapProjectType[data.projectType.value]
    data.purchaseWay.text = mapPurchaseWay[data.purchaseWay.value]

    data.saveRate.value *= 100
    return data
  })
}

//新增页获取proUserId
export const getProUserApi = () => {
  return request('/agencymng/ageprofessional/work/list', {
    method: 'get'
  })
}

//保存
export const saveFormDataApi = (params) => {
  return request('/agencymng/ageperformance/save', {
    method: 'post',
    data: params
  })
}


