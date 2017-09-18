/**
 * Created by chenkaixia on 2017/5/4.
 */
import {request}  from 'zcy-common';

export function getMenus() {
  return request('/api/privileges/getAppMenuTree',{
    method: 'get'
  });
}

export function getAppsBasicInfo() {
  return request('/api/apps/getAppsBasicInfo', {
    method: 'get'
  });
}

export function getBacklogTodoHeadInfo(params) {
  return request('/backlog/item/obtainBacklogHeadInfo', {
    method: 'post',
    contentType: 'application/json',
    ...params
  });
}
