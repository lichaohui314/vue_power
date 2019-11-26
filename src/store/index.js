import Vue from "vue";
import Vuex from "vuex";
import route from "./moudle/route";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 初始化设置用户没有获取过权限
    hasPermisson: false
  },
  mutations: {
    setPermisson(state) {
      console.log('已经获取过权限了')
      state.hasPermisson = true
    }
  },
  actions: {},
  modules: {
    route
  }
});
