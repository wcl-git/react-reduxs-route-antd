import { request } from 'zcy-common'

//获取主要、次要人员
export const getFormDataApi = (params) => {
  let data = {}
  return request('/agencymng/ageemployee/main/list', {
    method: 'get',
    params: {
      ...params
    }
  }).then((res) => {
    let systemData = {},
      financialData = {},
      legalData = {},
      techniqueData = {}

    const setDataTree = (data) => {
      let formData = {}
      for (let key in data) {
        formData[key] = {
          value: data[key]
        }
      }
      return formData
    }

    //附件
    const handleData = (data) => {
      if (!data.AGE_ORG_EMPLOYEE_PHOTO) {
        data.AGE_ORG_EMPLOYEE_PHOTO = {}
        data.AGE_EMPLOYEE_CARDID = {}
        data['AGE_ORG_EMPLOYEE_PHOTO'].value = data.filemanageMaps.value['AGE_ORG_EMPLOYEE_PHOTO']
        data['AGE_EMPLOYEE_CARDID'].value = data.filemanageMaps.value['AGE_EMPLOYEE_CARDID']
      }
      data.area = {
        text: data.districtFullName.value,
        value: [data.prov.value, data.city.value, data.dist.value]
      }
    }

    res.forEach((item) => {
      switch (item.type) {
        case '1':
          legalData = setDataTree(item)
          handleData(legalData)
          break
        case '2':
          techniqueData = setDataTree(item)
          handleData(techniqueData)
          break
        case '3':
          financialData = setDataTree(item)
          handleData(financialData)
          break
        case '6':
          systemData = setDataTree(item)
          handleData(systemData)
          break
        default:
          break
      }
    })
    data = { legalData, techniqueData, financialData, systemData }
    return getMinorFormDataApi({
      orgId: params.orgId
    })
  }).then((res) => {
    data.minor = res
    return data
  })
}

//获取主要人员
export const getKeyFormDataApi = (params) => {
  return request('/agencymng/ageemployee/main/list', {
    method: 'get',
    params: {
      ...params
    }
  })
}

//获取次要人员
export const getMinorFormDataApi = (params) => {
  return request('/agencymng/ageemployee/minor/list', {
    method: 'get',
    params: {
      ...params
    }
  })
}

//删除次要人员
export const removeFormDataApi = (params) => {
  return request('/agencymng/ageemployee/delete', {
    method: 'get',
    params
  }).then(() => getMinorFormDataApi())
}

//保存主要人员
export const saveFormDataApi = (params) => {
  return request('/agencymng/ageemployee/save', {
    method: 'post',
    data: params
  })
}
