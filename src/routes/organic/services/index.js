import { request } from 'zcy-common'

function transformData(data) {
  let result = {}
  for (let key in data) {
    result[key] = {
      value: data[key]
    }
  }
  return result
}

// 代理机构详细
export const organicDetail = (params) => {
  return request('/agencymng/ageorganic/detail', {
    params: {
      ...params
    }
  }).then(res => {
    let combineArea = {
      value: [res.bizProv, res.bizCity, res.bizDist]
    }
    // 代理机构头像附件
    let AGE_ORG_PHOTO = {
      value: res.filemanageMaps.AGE_ORG_PHOTO //array<object>
    }
    // 公司彩页
    let AGE_COMPANY_BROCHURE = {
      value: res.filemanageMaps.AGE_COMPANY_BROCHURE
    }
    // 机构内部认识财务和业务管理制度说明
    let AGE_ORG_YEARFINANCEREPORT_FILE = {
      value: res.filemanageMaps.AGE_ORG_YEARFINANCEREPORT_FILE
    }
    // 依法缴纳社会保障金证明
    let AGE_ORG_PROOFSECURITY_FILE = {
      value: res.filemanageMaps.AGE_ORG_PROOFSECURITY_FILE
    }
    // 内部机构设置
    let AGE_ORG_INSIDEORGANIZATION_FILE = {
      value: res.filemanageMaps.AGE_ORG_INSIDEORGANIZATION_FILE
    }
    // 机构章程
    let AGE_ORG_CONSTITUTION_FILE = {
      value: res.filemanageMaps.AGE_ORG_CONSTITUTION_FILE
    }
    // 机构内部认识财务和业务管理制度说明
    let AGE_ORG_BUSINESS_FILE = {
      value: res.filemanageMaps.AGE_ORG_BUSINESS_FILE
    }
    // 人事档案管理代理证明
    let AGE_ORG_PERSONNEL_FILE = {
      value: res.filemanageMaps.AGE_ORG_PERSONNEL_FILE
    }
    //变更申请书
    let AGE_ORG_CHANGE_COMPANY_FIEL = {
      value: AGE_ORG_CHANGE_COMPANY_FIEL
    }
    //变更依据
    let AGE_ORG_CHANGE_ACCORDING_FILE = {
      value: AGE_ORG_CHANGE_ACCORDING_FILE
    }

    let data = transformData(res)
    delete data.filemanageMaps
    //机构名称缓存
    data.fullNameCache = res.fullName

    return {
      ...data,
      combineArea,
      AGE_ORG_PHOTO,
      AGE_COMPANY_BROCHURE,
      AGE_ORG_YEARFINANCEREPORT_FILE,
      AGE_ORG_PROOFSECURITY_FILE,
      AGE_ORG_INSIDEORGANIZATION_FILE,
      AGE_ORG_CONSTITUTION_FILE,
      AGE_ORG_BUSINESS_FILE,
      AGE_ORG_PERSONNEL_FILE
    }
  })
}

// 验证代理机构名称唯一
export const checkFullName = fullName => {
  return request('/agencymng/ageorganic/checkFullName', {
    params: { fullName }
  })
}

// 编辑代理机构
export const organicUpdate = data => {
  return request('/agencymng/ageorganic/update', { method: 'POST', data })
}

// 新增联系人
export const contactsSave = data => {
  return request('/agencymng/ageorganic/contacts/save', {
    method: 'POST',
    data
  })
}

// 删除联系人
export const contactsDelete = position => {
  return request('/agencymng/ageorganic/contacts/delete', {
    params: { position }
  })
}

// 代理机构变更信息
export const organicChangeRecord = () => {
  return request('agencymng/ageorganic/change/record')
}

//todo
//提交登记
export const organicSubmit = () => {
  return request('/agencymng/ageorganic/submit')
}
