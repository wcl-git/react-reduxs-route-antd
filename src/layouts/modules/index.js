import {getMenus, getAppsBasicInfo, getBacklogTodoHeadInfo } from '../servers'

const MENUS = 'MENUS';
const MYDISTRICT = 'MYDISTRICT';
const OPENKEYS = 'OPENKEYS';
const APPMENUS = 'APPMENUS';
const USERIDENTITY = 'USERIDENTITY';
const BACKLOGTODO = 'BACKLOGTODO';
const APPSBASICINFO = 'APPSBASICINFO';

// 保存打开的菜单key
let openKeys = []

/**
 * 判断是否是重构的菜单
 * 如果是，则返回重构后的路径
 * @param {Array} routes
 * @param {String} origin
 * @param {String} path
 */
function getRefactorMenu(routes, origin, path) {
  const pathName = path.replace(origin, '')
  // 不存在过滤路由，则是
  if (!routes || !routes.length) {
    return pathName
  }
  // 存在，则需要判断是否在列表
  return routes.includes(pathName) ? pathName : ''
}

/**
 * 转换菜单结构
 * 将本域的所有菜单修改为本地路由方式
 * 设置是否是前端路由，以及前端路由路径
 * 设置key值，用于菜单组件的选中和展开
 * @param {Object} parent
 * @param {String} origin
 * @param {String} link
 */
function transformMenus(routes, parent, origin, link) {
  parent.child.forEach((menu, index) => {
    let path = menu.href

    if (path) {
      // 路径与当前的页面路径相同，则当前的菜单栏目将展开
      if (path === link) {
        openKeys.push(parent.key)
      }
      // 本域的链接
      if (path.startsWith(origin)) {
        // 是重构的菜单
        const refactorPath = getRefactorMenu(routes, origin, path)
        if (refactorPath) {
          menu.router = true
          // 只保留链接的path部分，作为前端路由路径
          menu.href = refactorPath
        }
      }
      menu.key = path
    } else {
      menu.key = +new Date() + index + '';
    }

    if (menu.child && menu.child.length) {
      transformMenus(routes, menu, origin, link)
    }
  })
}

export const getMenusAction = (routes, origin, link) => {
  return (dispatch) => {
    getMenus().then((res)=>{
      let menus = res.result;
      if (!menus || !menus.length) {
        return []
      }

      // 清空之前的值
      openKeys = []
      transformMenus(routes, {child: menus}, origin, link);
      //先派发openkeys事件，让menu获得默认打开的配置
      //顺序不可调换
      dispatch({
        type: OPENKEYS,
        payload: openKeys
      })
      dispatch({
        type: MENUS,
        payload: menus
      })
      
    })
  }
};

export const getAppsBasicInfoAction = () => {
  return (dispatch) => {
    getAppsBasicInfo().then((res) => {
      dispatch({
        type: APPSBASICINFO,
        payload: res.result
      })
    })
  }
}

export const getBacklogTodoHeadInfoAction = (params) => {
  return (dispatch) => {
    getBacklogTodoHeadInfo(params).then((res) => {
      dispatch({
        type: BACKLOGTODO,
        payload: res.data
      })
    })
  }
}

const ACTION_HANDLERS = {
  [MENUS]: (state, action) => {
    state.menus = action.payload;
    return state;
  },
  [OPENKEYS]: (state, action) => {
    state.openKeys = action.payload;
    return state;
  },
  [BACKLOGTODO]: (state, action) => {
    state.backLogTodo = Object.assign({}, state.backLogTodo, action.payload);
    return state;
  },
  [APPSBASICINFO]: (state, action) => {
    let userObj
    if (action.payload && action.payload.getUserIdentity && action.payload.getUserIdentity.length) {
      state.hasUserInfo = true;
      userObj = action.payload.getUserIdentity.filter((obj) => {
        if (obj.currentFlag) {
          return true
        }
        return false
      })[0]
    }
    state.appsBasicInfo = Object.assign({}, state.appsBasicInfo, action.payload);
    state.USER = Object.assign(state.USER, userObj);
    return state;
  },
};
const initialState = {
  menus: [],
  openKeys: [],
  hasUserInfo: false,
  backLogTodo: {
    backlogs:[],
    backlogCount: 0,
    messages: [],
    messageCount: 0,
  },
  appsBasicInfo: {
    getUserIdentity:[],
    getMyDistrict: {
      fullName: '',
    },
    getAppsByDimForFront: {
      appList: []
    },
  },
  USER: {}
};

export default function layoutReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  let nextState = Object.assign({}, state);
  return handler ? handler(nextState, action) : nextState
}
