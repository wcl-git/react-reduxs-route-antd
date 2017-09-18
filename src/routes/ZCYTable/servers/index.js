/**
 * Created by chenkaixia on 2017/6/20.
 */
import {request} from 'zcy-common';

export const getListAPI = ()=>{
 return request('/api/district/getSubDistrictByPid',{
     params: {
       pId:3310
     }
 })
}
