import Mock from "mockjs"
function auth() {
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
}
Mock.setup({
  timeout: 1000,
});
// 根据登陆的用户返回权限,(不同的用户权限是不同的)
Mock.mock(/\/auth/, auth);