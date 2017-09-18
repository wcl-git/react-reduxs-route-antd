import { request } from 'zcy-common'

//开评标场地列表
// const { pageNo = 1, pageSize = 10 } = res
// http://agency.dev-dragon.cai-inc.com/agencymng/agebidding/list
export const biddingList = params => {
  return request(`/agencymng/agebidding/list`, {
    params
  })
}

//删除开评标场地
export const biddingDelete = params => {
  const { id } = params
  return request(`/agencymng/agebidding/delete`, {
    params: { id }
  }).then(() => {
    return biddingList({})
  })
}
