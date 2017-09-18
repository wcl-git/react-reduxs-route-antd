import { request, Address } from 'zcy-common'

export const getFormDataApi = (params) => {
  return request(' /agencymng/agebranch/detail', {
    method: 'get',
    params: { ...params }
  }).then((res) => {
    let data = {}
    for (let key in res) {
      data[key] = {
        value: res[key]
      }
    }
    data.area = {
      text: data.districtFullName.value,
      value: [data.regProv.value, data.regCity.value, data.regDist.value]
    }
    if (!data.AGE_ORG_BRANCH_FILE) {
      data.AGE_ORG_BRANCH_FILE = {}
    }
    data.AGE_ORG_BRANCH_FILE.value = data.filemanageMaps.value.AGE_ORG_BRANCH_FILE
    const mapSubordination = {
      sub_company: '分公司',
      son_comapny: '子公司',
      office: '办事处',
      other: '其他',
    }
    data.subordination.text = mapSubordination[data.subordination.value]
    return data
  })
}

export const saveFormDataApi = (params) => {
  return request('/agencymng/agebranch/save', {
    method: 'post',
    data: params
  })
}

