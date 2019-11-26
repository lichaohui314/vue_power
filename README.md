## 安装 element-ui
1. npm i element-ui
2. vue add element-ui
3. vue ui 可视化工具里面安装
# 路由权限
## 一、服务端数据(服务端返回权限列表)
```js
    return {
        // 路由权限
        page: {
        home: true,
        home_index: true,
        home_index_1: true,
        count_to: true,
        upload: true,
        form: true,
        store: true
        },
        // 组件权限
        component: {
        edit_button: true,
        dele_button: false
        }
    }
```
## 二、拆分路由(把公共路由和权限路由分开)，根据路由构建组件
```js
// 动态路由
export const routerMap = [
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: { title: '首页' },
    children: [
      {
        path: "/home_index",
        name: "home_index",
        component: () => import("../views/HomeInex.vue"),
        meta: { title: '首页1' },
        children: [
          {
            path: "/form",
            name: "form",
            meta: { title: '首页1-1' },
            component: () => import("../views/form.vue")
          }
        ]
      },
      {
        path: "/home_index_1",
        name: "home_index_1",
        meta: { title: '首页2' },
        component: () => import("../views/HomeInex1.vue")
      }
    ]
  },
  {
    path: "/count-to",
    name: "count_to",
    meta: { title: '数到' },
    component: () => import("../views/ContTo.vue")
  },
  {
    path: "/upload",
    name: "upload",
    meta: { title: '上传' },
    component: () => import("../views/upload.vue")
  },
  {
    path: "/store",
    name: "store",
    component: () => import("../views/store.vue"),
    meta: { title: '仓库' },
  }
];
// 默认大家都能访问的路由
export const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/login.vue")
  },

  {
    path: "*",
    component: () => import("../views/error_404.vue")
  }
];
```
## 三、判断权限获取,如果没有获取就发送请求
- 默认设置没有获取过权限，在vuex里面设置没有获取过权限
```js
state:{
    hasPermission
}
```
- 在路由的钩子函数里面判断有没有获取过权限，如果没有就获取
```js
// 路由钩子
router.beforeEach(async (to, from, next) => {
  // 如果没有获取过权限，则获取路由权限
  if (!store.state.hasPermisson) {
    // 发送请求获取权限
    const newRouter = await store.dispatch("route/getAuthRoute");
    // vue-router Api 提供的动态添加路由的方法
  } else {
    next();
  }
});
```
## 四、在vuex中获取权限列表，并过滤出需要的路由
```js
const state = {
  menulist: [],
  btnPermission: {
    edit_button: true,
    dele_button: false,
  }
};
```
------
```js
const mutations = {
  setMenulist(state, routes) {
    state.menulist = routes
  },
  setCompe(state, { edit_button, dele_button }) {
    state.btnPermission.edit_button = edit_button
    state.btnPermission.dele_button = dele_button
  }
};
```
------
```js
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
      // 根据接口设置按钮权限
      commit('setCompe', { edit_button, dele_button })
    } catch (e) {
      console.log(e);
    }
    return needRouter
  }
};
```
------
```js
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
```
## 五、动态添加路由
```js
router.beforeEach(async (to, from, next) => {
  if (!store.state.hasPermisson) {
    const newRouter = await store.dispatch("route/getAuthRoute");
   + router.addRoutes(newRouter);   // 动态添加路由,router.addRoutes()
   + next({ ...to, replace: true });    // hacl写法
  } else {
    next();
  }
});
```
## 六、构建菜单组件(递归组件)
```html
<template>
  <div>
    <el-menu>
      <template class="item" v-for="(item,index) of menulist">
        <el-submenu v-if="item.children" :key="index" :index="item.name">
          <template slot="title">
            <router-link :to="{path:item.path}">{{item.meta.title}}</router-link>
          </template>
          <!-- 递归自己 -->
          <MyMenu :menulist="item.children"></MyMenu>
        </el-submenu>
        <el-menu-item v-else :index='item.name' :key="index">
          <router-link :to="{path:item.path}">{{item.meta.title}}</router-link>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
```
```js
export default {
  // props 接受父组件传过来的路由树
  props: ["menulist"],
  // 组件是可以在它们自己的模板中调用自身的。不过它们只能通过 name 选项来做这件事：
  name: "MyMenu"
};
```
## 七、组件权限(服务端数据，如果组件较多可以使用自定义指令)
```js
// 用法
<button v-has="'edit_button'">编辑</button>
<button v-has="'dele_button'">删除</button>
// 自定义指令
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
```
