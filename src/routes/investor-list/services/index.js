import { request } from 'zcy-common'

//出资人列表
export const investorList = params => {
  // const { orgId, ...rest } = params
  return request(`/agencymng/ageinvestor/list`, {
    // params: { orgId, ...rest }
    params
  })
}

//删除出资人
export const investorDelete = params => {
  const { id } = params
  return request(`/agencymng/ageinvestor/delete`, {
    params: { id }
  }).then(() => {
    return investorList({})
  })
}

//公司章程-附件
export const investorAttachments = (params) => {
  return request(`/agencymng/ageinvestor/attachments/list`, {
    params: {
      ...params
    }
  })
}

// 上传附件
export const attachmentUpload = attachmentMaps => {
  return request(`/agencymng/attachment/upload`, {
    method: 'POST',
    data: attachmentMaps
  })
}
// export const attachmentUpload = attachmentMaps => {
//   return request(`/agencymng/attachment/upload`, {
//     params: { attachmentMaps }
//   })
// }

// 删除附件
export const attachmentDelete = fileId => {
  return request(`/agencymng/attachment/delete`, {
    params: { fileId }
  })
}
