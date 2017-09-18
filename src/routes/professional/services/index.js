import { request } from 'zcy-common'

function transformData(data) {
  let result = {};
  for (let key in data) {
    result[key] = {
      value: data[key]
    }
  }
  return result
}

//获得专职人员详情
export const getProfessionalApi = params => {
  return request(`/agencymng/ageprofessional/detail`, {
    method: 'get',
    params: params
  }).then((res) => {
    let PRO_CARDID_FILE, PRO_EDUCATION_FILE, PRO_FRONT_PHOTO, PRO_INTERMEDIATE_FILE;
    if (!res) {
      return {}
    }
    if (res.filemanageMaps) {
      PRO_CARDID_FILE = {
        value: res.filemanageMaps.PRO_CARDID_FILE
      }
      PRO_EDUCATION_FILE = {
        value: res.filemanageMaps.PRO_EDUCATION_FILE
      }
      PRO_FRONT_PHOTO = {
        value: res.filemanageMaps.PRO_FRONT_PHOTO
      }
      PRO_INTERMEDIATE_FILE = {
        value: res.filemanageMaps.PRO_INTERMEDIATE_FILE
      }
    }
    
    let address = {
      value:[res.bizProve, res.bizCity, res.bizDist]
    }
    delete res.filemanageMaps
    delete res.bizProve
    delete res.bizCity
    delete res.bizDist
    let data = transformData(res)
    return {
      ...data,
      address,
      PRO_CARDID_FILE,
      PRO_EDUCATION_FILE,
      PRO_FRONT_PHOTO,
      PRO_INTERMEDIATE_FILE,
    }
  })
}

//更新专职人员详情
export const updateProfessional = params => {
  return request(`/agencymng/ageprofessional/update`, {
    method: 'post',
    data: params
  })
}

