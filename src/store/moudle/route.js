// store/moudle/route.js 管理路由的vuex
import { getAuth } from "../../api";
// 引入动态路由列表
import { routerMap } from "../../router";
// 过滤需要路由的方法
const getAccesRouterList = (routes, page) => {
  return routes.filter(item => {
    if (page[item.name]) {
      // 如果有子路由就递归判断子路由是否有权限
      if (item.children) item.children = getAccesRouterList(item.children, page)
      return true;
    } else {
      return false;
    }
  });
};


const state = {
  menulist: [],
  hasGetRules: false,
  // 组件权限
  btnPermission: {
    edit_button: true,
    dele_button: false,
  }
};
const mutations = {
  setMenulist(state, routes) {
    state.menulist = routes
  },
  // 设置按钮权限
  setCompe(state, { edit_button, dele_button }) {
    state.btnPermission.edit_button = edit_button
    state.btnPermission.dele_button = dele_button
  }
};
const actions = {
  async getAuthRoute({ commit }) {
    let needRouter
    try {
      // 获取后台返回的权限列表
      // eslint-disable-next-line no-unused-vars
      const rules = await getAuth();
      let { page, component: { edit_button, dele_button } } = rules
      // 根据权限列表来过滤出我需要的路由列表
      needRouter = getAccesRouterList(routerMap, page);
      // 把权限路由列表放在 store.state下面
      commit('setMenulist', needRouter)
      // 已经获取过权限,修改获取权限的状态
      commit('setPermisson', null, { root: true })
      // 根据接口设置按钮权限
      commit('setCompe', { edit_button, dele_button })
    } catch (e) {
      console.log(e);
    }
    return needRouter
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
}