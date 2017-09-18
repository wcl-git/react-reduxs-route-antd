import { connect } from 'react-redux'
import reducer,{ getAppsBasicInfoAction, getMenusAction, getBacklogTodoHeadInfoAction } from '../modules/index'
import { injectReducer } from 'store/reducers'
import CoreLayout from '../CoreLayout/CoreLayout'

const mapDispatchToProps = {
  getMenus :(routes, origin, link) => getMenusAction(routes, origin, link),
  getBacklogTodo: (params) => getBacklogTodoHeadInfoAction(params),
  getAppsBasicInfo: () => getAppsBasicInfoAction(),
}

const mapStateToProps = (state) => {
  let layout = state.layout;
  return {
    menus : layout.menus,
    openKeys: layout.openKeys,
    backLogTodo: layout.backLogTodo,
    appsBasicInfo: layout.appsBasicInfo,
    hasUserInfo: layout.hasUserInfo
  }
}


export default function(store){
  injectReducer(store, { key: 'layout', reducer })
  return connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
}
