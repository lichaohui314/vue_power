<template>
  <div>
    <el-menu>
      <template class="item"
                v-for="(item,index) of menulist">
        <!-- 如果有儿子 -->
        <el-submenu v-if="item.children"
                    :key="index"
                    :index="item.name">
          <template slot="title">
            <router-link :to="{path:item.path}">{{item.meta.title}}</router-link>
          </template>
          <!-- 这个就是递归组件,把 name 直接当标签使用 -->
          <MyMenu :menulist="item.children"></MyMenu>
        </el-submenu>
        <el-menu-item v-else
                      :index='item.name'
                      :key="index">
          <router-link :to="{path:item.path}">{{item.meta.title}}</router-link>
        </el-menu-item>

      </template>
    </el-menu>
  </div>
</template>

<script>
// import { mapState } from "vuex";
export default {
  // props 接受父组件传过来的路由树
  props: ["menulist"],
  // 组件是可以在它们自己的模板中调用自身的。不过它们只能通过 name 选项来做这件事：
  name: "MyMenu"
};
</script>

<style>
</style>