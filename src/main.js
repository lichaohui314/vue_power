import Vue from "vue";
import ElementUI from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";

// eslint-disable-next-line global-require
if (process.env.NODE_ENV === "development") require("./mock");
// 路由钩子
router.beforeEach(async (to, from, next) => {
  // 如果没有获取过权限，则获取路由权限
  if (!store.state.hasPermisson) {
    // 发送请求获取权限
    const newRouter = await store.dispatch("route/getAuthRoute");
    // vue-router Api 提供的动态添加路由的方法
    router.addRoutes(newRouter);
    next({ ...to, replace: true });
  } else {
    next();
  }
});
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.directive("has", {
  // inserted 表示插入 dom 完毕
  inserted(el, bindings, vnode) {
    console.log(el, bindings, vnode)
    let { value } = bindings;
    let flag = vnode.context.$store.state.route.btnPermission[value];
    // 如果 flag 为 false ,就把当前节点从页面删除
    !flag && el.parentNode.removeChild(el)
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")