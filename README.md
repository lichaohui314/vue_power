## 安装 element-ui
1. npm i element-ui
2. vue add element-ui
3. vue ui 可视化工具里面安装

## 权限管理
管理员      普通用户
商品列表    商品列表
购物车      购物车
添加商品
管理用户

## npm i axios mockjs
## 
1. 后台动态返回路由(mock/index.js)
2. 要判断当前角色有没有获取过权限
3. 导航的数据结构
```js
[
    {name:1,children:[
        {name:1-1,children:[
            {name:1-1-1}
        ]},
        {name:1-2}
    ]},
    {name:2,children:[
        {name:2-1}
    ]}
]
```