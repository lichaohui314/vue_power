import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
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
    // children: [
    //   {
    //     path: "/home_index",
    //     name: "home_index",
    //     meta: { title: '首页21' },
    //     component: () => import("../views/HomeInex.vue")
    //   },
    //   {
    //     path: "/home_index_1",
    //     name: "home_index_1",
    //     meta: { title: '首页22' },
    //     component: () => import("../views/HomeInex1.vue")
    //   }
    // ]
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
    // name: "error",
    component: () => import("../views/error_404.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
