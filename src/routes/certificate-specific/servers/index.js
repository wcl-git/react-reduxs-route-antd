/**
 * Created by chenkaixia on 2017/6/19.
 */
import {request} from 'zcy-common';


export const getSpecificApi = (params) => {
  return request('/agencymng/agequalification/detail', {
    params: {
      ...params
    }
  }).then((res)=>{
    let data = {}
    for(let key in res){
      if (key === 'code') {
        data[key] = {
          value: {
            value: res[key],
            label: res['name']
          }
        }
      }else{
        data[key]={
          value:res[key]
        } 
      }
    }
    return data;
  })
}

export const getSpecificTreesApi = () => {
  return request('/agencymng/meta/specific/trees')
}

export const getDraftDetailApi = (params) => {
  return request('/agencymng/meta/draft/detail', {
    params: {
      ...params
    }
  })
}

export const updateCreditApi = (params) => {
  return request('/agencymng/agequalification/specific/save', {
    method: 'post',
    data: {
      ...params
    }
  })
}

