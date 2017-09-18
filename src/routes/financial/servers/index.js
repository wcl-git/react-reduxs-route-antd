import { request, Address } from 'zcy-common'

export const getFormDataApi = (params) => {
  return request('/agencymng/agefinance/detail', {
    method: 'get',
    params: { 
      ...params 
    }
  }).then((res) => {
    let data = {}
    for (let key in res) {
      if (key === 'totalAssets' ||
        key === 'investmentAbroad' ||
        key === 'ownershipinterest' ||
        key === 'totalLiabilitie' ||
        key === 'capitalAmount' ||
        key === 'totalProfit' ||
        key === 'salesMoney' ||
        key === 'totalProfit' ||
        key === 'taxPaid' ||
        key === 'incomeTax' ||
        key === 'netProfit') {
        data[key] = { value: res[key] /= 1000000 }
      } else {
        data[key] = { value: res[key] }
      }
    }

    const radioMap = {
      0: '否',
      1: '是'
    }
    //是否
    data.isAudit && (data.isAudit.text = radioMap[data.isAudit.value])

    //使下步可赋值
    if (!data.AGE_ORG_FINANCE_FILE) {
      data.AGE_ORG_FINANCE_FILE = {}
    }

    //将附件数组对象值拿出
    data.AGE_ORG_FINANCE_FILE.value = data.filemanageMaps.value.AGE_ORG_FINANCE_FILE
    data.assetLiabilityRatio = {}
    data.salesProfitMargin = {}
    
    return data
  })
}

export const saveFormDataApi = (params) => {
  return request('/agencymng/agefinance/save', {
    method: 'post',
    data: params
  })
}

